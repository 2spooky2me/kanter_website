const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const defaultSofas = require('./defaultSofas.cjs');

const PORT = Number(process.env.API_PORT || process.env.PORT || 4000);
const HOST = process.env.API_HOST || process.env.HOST || '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'sofas.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const IMAGE_DIR = path.join(__dirname, '..', 'src', 'images');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const MAX_BODY_SIZE = 25 * 1024 * 1024;
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;
const TOKEN_SECRET =
    process.env.ADMIN_TOKEN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'change-this-local-dev-secret';
const DEFAULT_ADMIN_USER = process.env.ADMIN_USER || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kanter123';

const ensureDataFile = () => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSofas, null, 2), 'utf8');
    }
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => ({
    salt,
    passwordHash: crypto
        .pbkdf2Sync(String(password), salt, 120000, 64, 'sha512')
        .toString('hex'),
});

const ensureAdminFile = () => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(ADMIN_FILE)) {
        const password = hashPassword(DEFAULT_ADMIN_PASSWORD);
        fs.writeFileSync(
            ADMIN_FILE,
            JSON.stringify(
                {
                    username: DEFAULT_ADMIN_USER,
                    ...password,
                    updatedAt: new Date().toISOString(),
                },
                null,
                2
            ),
            'utf8'
        );
    }
};

const readAdminCredentials = () => {
    ensureAdminFile();
    return JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8'));
};

const writeAdminCredentials = ({ username, password }) => {
    ensureAdminFile();
    const hashedPassword = hashPassword(password);
    const nextCredentials = {
        username,
        ...hashedPassword,
        updatedAt: new Date().toISOString(),
    };
    const tempFile = `${ADMIN_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(nextCredentials, null, 2), 'utf8');
    fs.renameSync(tempFile, ADMIN_FILE);
    return nextCredentials;
};

const readSofas = () => {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultSofas;
};

const writeSofas = (sofas) => {
    ensureDataFile();
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(sofas, null, 2), 'utf8');
    fs.renameSync(tempFile, DATA_FILE);
};

const sendJson = (res, statusCode, payload) => {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end(JSON.stringify(payload));
};

const sendError = (res, statusCode, message) => {
    sendJson(res, statusCode, { error: message });
};

const readBody = (req) =>
    new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
            if (body.length > MAX_BODY_SIZE) {
                reject(new Error('Request body is too large'));
                req.destroy();
            }
        });

        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });

        req.on('error', reject);
    });

const safeCompare = (left, right) => {
    const leftBuffer = Buffer.from(String(left));
    const rightBuffer = Buffer.from(String(right));

    return (
        leftBuffer.length === rightBuffer.length &&
        crypto.timingSafeEqual(leftBuffer, rightBuffer)
    );
};

const verifyPassword = (password, credentials) => {
    const hashedPassword = hashPassword(password, credentials.salt);
    return safeCompare(hashedPassword.passwordHash, credentials.passwordHash);
};

const toBase64Url = (value) =>
    Buffer.from(value)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

const fromBase64Url = (value) => {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    return Buffer.from(padded, 'base64').toString('utf8');
};

const signTokenPayload = (payload) =>
    crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');

const createAdminToken = (username) => {
    const payload = toBase64Url(
        JSON.stringify({
            sub: username,
            exp: Date.now() + TOKEN_TTL_MS,
        })
    );
    const signature = signTokenPayload(payload);
    return `${payload}.${signature}`;
};

const verifyAdminToken = (token) => {
    if (!token || !token.includes('.')) {
        return false;
    }

    const [payload, signature] = token.split('.');
    if (!payload || !signature || !safeCompare(signature, signTokenPayload(payload))) {
        return false;
    }

    try {
        const parsed = JSON.parse(fromBase64Url(payload));
        const credentials = readAdminCredentials();
        return parsed.sub === credentials.username && parsed.exp > Date.now();
    } catch (error) {
        return false;
    }
};

const requireAdmin = (req, res) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!verifyAdminToken(token)) {
        sendError(res, 401, 'Unauthorized');
        return false;
    }

    return true;
};

const textField = (value, fallback = '') => {
    if (value && typeof value === 'object') {
        return {
            he: value.he || value.ru || fallback,
            ru: value.ru || value.he || fallback,
        };
    }

    return {
        he: value || fallback,
        ru: value || fallback,
    };
};

const normalizeSofa = (sofa) => ({
    id: sofa.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: textField(sofa.name, 'ספה בהתאמה אישית'),
    description: textField(sofa.description, ''),
    category: textField(sofa.category, 'ספות מעוצבות'),
    image: sofa.image || '',
});

const publicOrigin = (req) => {
    const host = req.headers.host || `localhost:${PORT}`;
    return `http://${host}`;
};

const withPublicImageUrls = (req, sofas) =>
    sofas.map((sofa) => ({
        ...sofa,
        image: sofa.image && sofa.image.startsWith('/assets/')
            ? `${publicOrigin(req)}${sofa.image}`
            : sofa.image,
    }));

const serveAsset = (req, res, pathname) => {
    const filename = path.basename(decodeURIComponent(pathname.replace('/assets/', '')));
    const filePath = path.join(IMAGE_DIR, filename);

    if (!filePath.startsWith(IMAGE_DIR) || !fs.existsSync(filePath)) {
        sendError(res, 404, 'Asset not found');
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'image/webp',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
    });
    fs.createReadStream(filePath).pipe(res);
};

const MIME_TYPES = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
};

const serveStaticBuild = (res, pathname) => {
    if (!fs.existsSync(BUILD_DIR)) {
        sendJson(res, 200, {
            name: 'Kanter API',
            health: '/api/health',
            sofas: '/api/sofas',
            note: 'Run npm run build to serve the production website.',
        });
        return;
    }

    const requestedPath =
        pathname === '/'
            ? 'index.html'
            : decodeURIComponent(pathname).replace(/^[/\\]+/, '');
    const candidatePath = path.normalize(path.join(BUILD_DIR, requestedPath));
    const candidateExists = fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile();
    const filePath =
        candidatePath.startsWith(BUILD_DIR) && candidateExists
            ? candidatePath
            : path.join(BUILD_DIR, 'index.html');
    const extension = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
        'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
        'Cache-Control':
            filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    fs.createReadStream(filePath).pipe(res);
};

const handleApi = async (req, res, pathname) => {
    if (req.method === 'OPTIONS') {
        sendJson(res, 204, {});
        return;
    }

    if (pathname === '/api/health' && req.method === 'GET') {
        sendJson(res, 200, { ok: true });
        return;
    }

    if (pathname === '/api/admin/login' && req.method === 'POST') {
        const body = await readBody(req);
        const credentials = readAdminCredentials();
        const isValid =
            safeCompare(body.username || '', credentials.username) &&
            verifyPassword(body.password || '', credentials);

        if (!isValid) {
            sendError(res, 401, 'Invalid username or password');
            return;
        }

        sendJson(res, 200, {
            token: createAdminToken(credentials.username),
            expiresInMs: TOKEN_TTL_MS,
        });
        return;
    }

    if (pathname === '/api/admin/credentials' && req.method === 'PUT') {
        if (!requireAdmin(req, res)) {
            return;
        }

        const body = await readBody(req);
        const credentials = readAdminCredentials();
        const nextUsername = String(body.username || '').trim();
        const nextPassword = String(body.newPassword || '');

        if (!verifyPassword(body.currentPassword || '', credentials)) {
            sendError(res, 401, 'Current password is incorrect');
            return;
        }

        if (nextUsername.length < 3) {
            sendError(res, 400, 'Username must be at least 3 characters');
            return;
        }

        if (nextPassword.length < 8) {
            sendError(res, 400, 'Password must be at least 8 characters');
            return;
        }

        const nextCredentials = writeAdminCredentials({
            username: nextUsername,
            password: nextPassword,
        });

        sendJson(res, 200, {
            username: nextCredentials.username,
            token: createAdminToken(nextCredentials.username),
            expiresInMs: TOKEN_TTL_MS,
        });
        return;
    }

    if (pathname === '/api/sofas' && req.method === 'GET') {
        sendJson(res, 200, withPublicImageUrls(req, readSofas()));
        return;
    }

    if (pathname === '/api/sofas' && req.method === 'POST') {
        if (!requireAdmin(req, res)) {
            return;
        }

        const body = normalizeSofa(await readBody(req));
        const sofas = [body, ...readSofas()];
        writeSofas(sofas);
        sendJson(res, 201, withPublicImageUrls(req, [body])[0]);
        return;
    }

    const match = pathname.match(/^\/api\/sofas\/([^/]+)$/);
    if (!match) {
        sendError(res, 404, 'Not found');
        return;
    }

    const sofaId = decodeURIComponent(match[1]);

    if (req.method === 'PUT') {
        if (!requireAdmin(req, res)) {
            return;
        }

        const body = normalizeSofa({ ...(await readBody(req)), id: sofaId });
        const sofas = readSofas();
        const nextSofas = sofas.map((sofa) => (sofa.id === sofaId ? body : sofa));

        if (!sofas.some((sofa) => sofa.id === sofaId)) {
            sendError(res, 404, 'Sofa not found');
            return;
        }

        writeSofas(nextSofas);
        sendJson(res, 200, withPublicImageUrls(req, [body])[0]);
        return;
    }

    if (req.method === 'DELETE') {
        if (!requireAdmin(req, res)) {
            return;
        }

        const sofas = readSofas();
        const nextSofas = sofas.filter((sofa) => sofa.id !== sofaId);
        writeSofas(nextSofas);
        sendJson(res, 200, { id: sofaId });
        return;
    }

    sendError(res, 405, 'Method not allowed');
};

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    try {
        if (pathname.startsWith('/assets/')) {
            serveAsset(req, res, pathname);
            return;
        }

        if (pathname.startsWith('/api/')) {
            await handleApi(req, res, pathname);
            return;
        }

        serveStaticBuild(res, pathname);
    } catch (error) {
        sendError(res, error.message === 'Request body is too large' ? 413 : 500, error.message);
    }
});

ensureDataFile();
ensureAdminFile();
server.listen(PORT, HOST, () => {
    console.log(`Kanter API running at http://${HOST}:${PORT}`);
});
