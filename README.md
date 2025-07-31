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

### Backend Deployment (Render)

1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Configure the deployment:
   - Name: your-app-name
   - Region: Choose the closest to your users
   - Branch: main (or your main branch)
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
6. Add your environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
7. Click "Create Web Service"

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
