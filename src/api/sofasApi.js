const getApiBaseUrl = () => {
    const configuredUrl = process.env.REACT_APP_API_URL;
    if (configuredUrl) {
        return configuredUrl.replace(/\/$/, '');
    }

    if (process.env.NODE_ENV === 'production') {
        return '';
    }

    if (typeof window === 'undefined') {
        return 'http://localhost:4000';
    }

    if (window.location.port === '4000') {
        return '';
    }

    return `${window.location.protocol}//${window.location.hostname}:4000`;
};

const requestJson = async (path, options = {}) => {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Server request failed');
    }

    return data;
};

const getAdminToken = () => window.sessionStorage.getItem('kanter_admin_token') || '';

const withAdminAuth = (options = {}) => ({
    ...options,
    headers: {
        Authorization: `Bearer ${getAdminToken()}`,
        ...(options.headers || {}),
    },
});

export const loginAdmin = (credentials) =>
    requestJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

export const updateAdminCredentials = (credentials) =>
    requestJson('/api/admin/credentials', withAdminAuth({
        method: 'PUT',
        body: JSON.stringify(credentials),
    }));

export const fetchSofas = () => requestJson('/api/sofas');

export const createSofa = (sofa) =>
    requestJson('/api/sofas', withAdminAuth({
        method: 'POST',
        body: JSON.stringify(sofa),
    }));

export const updateSofa = (sofa) =>
    requestJson(`/api/sofas/${encodeURIComponent(sofa.id)}`, withAdminAuth({
        method: 'PUT',
        body: JSON.stringify(sofa),
    }));

export const deleteSofa = (id) =>
    requestJson(`/api/sofas/${encodeURIComponent(id)}`, withAdminAuth({
        method: 'DELETE',
    }));
