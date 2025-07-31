# Flipkart Clone

A full-stack e-commerce application built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication
- Product listing and search
- Shopping cart functionality
- Order placement
- Payment integration
- Responsive design

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Netlify account (for frontend)
- Render account (for backend)
- GitHub account

## Setup Instructions

### 1. Backend Setup

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the server directory with your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
5. Start the development server:
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

### Backend Deployment (DigitalOcean)

1. **Create a DigitalOcean Droplet**:
   - Go to [DigitalOcean](https://cloud.digitalocean.com/droplets)
   - Click "Create" > "Droplets"
   - Choose "Ubuntu" as the distribution
   - Select a Basic plan (Starter: $6/month is sufficient for development)
   - Choose a datacenter region closest to your users
   - Set authentication (SSH key recommended)
   - Click "Create Droplet"

2. **Connect to your Droplet**:
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Set up the server**:
   ```bash
   # Update packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 process manager
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Install MongoDB
   sudo apt install -y mongodb
   sudo systemctl enable mongodb
   sudo systemctl start mongodb
   ```

4. **Deploy your code**:
   ```bash
   # Clone your repository
   git clone https://github.com/your-username/flipkart-clone.git
   cd flipkart-clone/server
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   nano .env
   # Add your MONGODB_URI and other environment variables
   
   # Start the server with PM2
   pm2 start index.js --name "flipkart-backend"
   
   # Configure PM2 to start on boot
   pm2 startup
   pm2 save
   ```

5. **Set up Nginx as a reverse proxy**:
   ```bash
   sudo nano /etc/nginx/sites-available/flipkart
   ```
   
   Add the following configuration (replace `your_domain` with your domain or IP):
   ```
   server {
       listen 80;
       server_name your_domain;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable the site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/flipkart /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up a domain (optional)**:
   - Point your domain's A record to your Droplet's IP address
   - Set up SSL with Let's Encrypt:
     ```bash
     sudo apt install -y certbot python3-certbot-nginx
     sudo certbot --nginx -d your_domain
     ```

### Frontend Deployment (Netlify)

1. Push your code to a GitHub repository
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect to your GitHub repository
5. Configure the settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
6. Add environment variables if needed
7. Click "Deploy site"

## Environment Variables

### Backend (`.env` in server directory)

```
MONGODB_URI=your_mongodb_connection_string
```

### Frontend (Set in Netlify)

```
REACT_APP_API_URL=your_render_backend_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
