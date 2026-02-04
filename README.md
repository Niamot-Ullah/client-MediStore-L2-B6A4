# MediStore Backend API 💊

> Backend API for MediStore - Your Trusted Online Medicine Shop

A full-stack e-commerce backend for managing over-the-counter (OTC) medicine sales, inventory, and orders. Built to support customers, sellers, and administrators with role-based access control.

---
Frontend Repo    : https://github.com/Niamot-Ullah/client-MediStore-L2-B6A4
Backend Repo     : https://github.com/Niamot-Ullah/server-MediStore-L2-B6A4---2
Frontend Live    : https://client-medi-store-l2-b6-a4.vercel.app
Backend Live     : https://server-medi-store-l2-b6-a4.vercel.app
Admin Email      : admin@gmail.com
Admin Password   : password1234
Seller Email      : seller@gmail.com
Seller Password   : password1234
Customer Email      : customer@gmail.com
Customer Password   : password1234





## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication & Authorization](#-authentication--authorization)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality
- **Multi-Role System**: Customer, Seller, and Admin roles with distinct permissions
- **Authentication**: Secure JWT-based authentication
- **Medicine Management**: Full CRUD operations for medicine inventory
- **Order Processing**: Complete order lifecycle from creation to delivery
- **Search & Filtering**: Advanced filtering by category, price, manufacturer
- **Review System**: Customer feedback and ratings
- **Cash on Delivery**: Payment method support

### Role-Based Features

#### Customer Features
- Browse and search medicines
- Shopping cart management
- Order placement and tracking
- Review submission
- Profile management

#### Seller Features
- Inventory management (add, edit, remove medicines)
- Stock level tracking
- Order fulfillment
- Sales dashboard

#### Admin Features
- User management (ban/unban)
- Platform-wide medicine oversight
- Category management
- Order monitoring
- Analytics dashboard

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL / MongoDB / MySQL (specify your choice)
- **ORM/ODM**: Prisma / Mongoose / Sequelize (specify your choice)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator / Joi / Zod
- **Password Hashing**: bcrypt

### Additional Libraries
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Morgan**: HTTP request logger
- **Dotenv**: Environment configuration
- **Multer**: File upload handling (for medicine images)

---

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ HTTP/HTTPS
       │
┌──────▼──────────────────────────┐
│     Express.js API Server       │
├─────────────────────────────────┤
│  ┌─────────────────────────┐   │
│  │   Middleware Layer      │   │
│  │  - Auth                 │   │
│  │  - Validation           │   │
│  │  - Error Handling       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Route Layer           │   │
│  │  - Auth Routes          │   │
│  │  - Medicine Routes      │   │
│  │  - Order Routes         │   │
│  │  - Seller Routes        │   │
│  │  - Admin Routes         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Controller Layer      │   │
│  │  - Business Logic       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Service Layer         │   │
│  │  - Data Operations      │   │
│  └─────────────────────────┘   │
└─────────────┬───────────────────┘
              │
       ┌──────▼──────┐
       │   Database  │
       └─────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL/MongoDB/MySQL (based on your choice)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medistore-backend.git
   cd medistore-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   # For Prisma
   npx prisma migrate dev
   npx prisma db seed

   # For Sequelize
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all

   # For Mongoose (MongoDB)
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000` (or your configured port).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/medistore
# OR for MongoDB
# MONGODB_URI=mongodb://localhost:27017/medistore

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---
