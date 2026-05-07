# Kanter Website EC2 Deployment

This setup runs one Node server on `127.0.0.1:4000`.
The Node server serves both:

- React production build
- API routes under `/api`

Nginx receives public traffic on port `80` and proxies it to Node.

## 1. EC2 Requirements

Use Ubuntu 22.04 or newer.
Open these inbound ports in the EC2 Security Group:

- `22` for SSH
- `80` for HTTP
- `443` for HTTPS later, when adding SSL

## 2. Install Server Packages

```bash
sudo apt update
sudo apt install -y nodejs npm nginx git
node -v
npm -v
```

For production, Node 20 LTS is recommended.

## 3. Upload Or Clone The Project

Recommended path:

```bash
sudo mkdir -p /var/www
sudo chown -R ubuntu:ubuntu /var/www
cd /var/www
git clone YOUR_REPOSITORY_URL kanter_website
cd kanter_website
```

If you do not use Git, upload the project folder to `/var/www/kanter_website`.

## 4. Install And Build

```bash
npm install
npm run build
```

## 5. Configure Admin Secrets

Before the first production run, edit `deploy/kanter.service` and replace:

- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN_SECRET`

Important: `server/data/admin.json` is created on first start. If it already exists, changing `ADMIN_PASSWORD` in the service will not replace the saved admin password. Use the admin dashboard to change it.

## 6. Install systemd Service

```bash
sudo cp deploy/kanter.service /etc/systemd/system/kanter.service
sudo systemctl daemon-reload
sudo systemctl enable kanter
sudo systemctl start kanter
sudo systemctl status kanter
```

Check API health:

```bash
curl http://127.0.0.1:4000/api/health
```

## 7. Configure Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/kanter
sudo ln -s /etc/nginx/sites-available/kanter /etc/nginx/sites-enabled/kanter
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Now open:

```text
http://YOUR_EC2_PUBLIC_IP
http://YOUR_EC2_PUBLIC_IP/admin
```

## 8. Persistent Data

Gallery/admin data is stored in:

```text
server/data/
```

Back up this folder before replacing the server or deleting the project.

## 9. Update Deployment

```bash
cd /var/www/kanter_website
git pull
npm install
npm run build
sudo systemctl restart kanter
```
