# Flipkart Clone

A simplified Flipkart clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates core e-commerce functionality with a clean, responsive UI.

🔗 **Live Demo:** [Frontend](https://flipkart-zeta-dun.vercel.app/) | [Backend API](https://flipkart-backend-ozsq.onrender.com)

## Features

- **Product Browsing**
  - View products in a responsive grid
  - Product details page
  - Product categories

- **Shopping Cart**
  - Add/remove items
  - Adjust quantities
  - View cart total

- **User Authentication**
  - User registration and login
  - Protected routes

- **Checkout**
  - Simple checkout process
  - Order placement

## Tech Stack

- **Frontend**: React, Redux, Material-UI, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/HimankMahani/flipkart.git
   cd flipkart
   ```

2. Set up the backend
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your MongoDB and other configurations
   npm start
   ```

3. Set up the frontend
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Update REACT_APP_API_URL if needed
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Environment Variables

Create a `.env` file in both `client` and `server` directories:

**Backend (.env)**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000
```

## Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

