# Glora – Mehndi Booking Platform

Glora is a full-stack MERN booking platform designed to streamline mehndi artist discovery, design management, pricing, and customer bookings while preventing scheduling conflicts and double bookings.

## 🚀 Features

- 🔐 JWT-based authentication
- 👥 Role-based access control
- 👤 Admin, Artist, and Customer roles
- 🎨 Mehndi design management
- 👩‍🎨 Artist management
- 📅 Customer booking system
- 💰 Dynamic pricing support
- 🛡️ Protected API routes
- 🚫 Double-booking prevention
- ✅ Server-side request validation
- 🚦 API rate limiting
- 🔒 Helmet security headers
- 🌐 Strict CORS configuration
- 🧪 Backend integration testing
- 🗄️ MongoDB-based data persistence
- ⚡ RESTful APIs

## 🏗️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod

### Security & Testing

- Helmet
- express-rate-limit
- Zod
- Jest
- Supertest

## 👥 User Roles

| Role | Capabilities |
|---|---|
| Customer | Browse designs, view artists, create and manage bookings |
| Artist | Manage artist information and handle assigned bookings |
| Admin | Manage artists, bookings, users and mehndi designs |

## 📂 Project Structure

```text
GlowHenna/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   └── server.js
│
└── README.md
