# 📖 Blog Pedia API for b4-assignment-3

🚀 A powerful, scalable, and secure RESTful API for a blogging platform, built with **TypeScript, Node.js, Express.js, and MongoDB**.

---
## 🌍 Live Demo
- **Project Name:** Blog Pedia API
- **API URL:** [https://blog-pedia10.vercel.app](https://blog-pedia10.vercel.app)
- **API Documentation:** [https://documenter.getpostman.com/view/31322920/2sAYX8GfK5](https://documenter.getpostman.com/view/31322920/2sAYX8GfK5)
  
## 🌟 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (**Admin & User**)
- Protected routes
- Input validation using **Zod**

### 👤 User Management
- User registration & login
- **Admin** can block users
- Secure password hashing with **bcrypt**
- User role management (**Admin/User**)

### ✍️ Blog Management
- **CRUD** (Create, Read, Update, Delete) operations for blogs
- Public API for reading blogs
- Advanced search functionality
- Sorting & filtering capabilities
- **Pagination** support

### 🛠️ Admin Features
- Block users
- Delete any blog
- Special admin privileges

### ⚠️ Error Handling
- Global error handler
- Custom error classes
- Validation error handling
- Proper error responses
- Error stacks in development mode

---
## 🏗️ Tech Stack

- **TypeScript**
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Zod** for validation
- **Cors** for cross-origin support
- **ESLint & Prettier** for code quality

---
## 📌 API Endpoints

### 🔑 Authentication
```http
POST /api/auth/register   # Register a new user
POST /api/auth/login      # Login user
```

### 📝 Blog Management
```http
GET /api/blogs            # Get all blogs (Public)
POST /api/blogs           # Create a new blog (Protected)
PATCH /api/blogs/:id      # Update a blog (Protected)
DELETE /api/blogs/:id     # Delete a blog (Protected)
```

### 🛡️ Admin Routes
```http
PATCH /api/admin/users/:userId/block   # Block a user
DELETE /api/admin/blogs/:id            # Delete any blog
```

---
## 🚀 Getting Started

### ✅ Prerequisites
- **Node.js** installed
- **MongoDB** setup
- **npm** or **yarn** installed

### 🔧 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hanif365/b4-assignment-3.git
   cd b4-assignment-3
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory:
   ```ini
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_ACCESS_SECRET=your_jwt_secret
   JWT_ACCESS_EXPIRES_IN=7d
   BCRYPT_SALT_ROUNDS=12
   ```

### ▶️ Running the Application

**Development Mode:**
```bash
npm run start:dev
```

**Production Mode:**
```bash
npm run build
npm start
```

---
## 👨‍💼 Admin Credentials
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

---
## 📜 API Documentation

### 🔍 Search, Sort & Filter
The public blog API (`GET /api/blogs`) supports:

- **Search:** `?search=keyword`
- **Sort:** `?sortBy=field&sortOrder=asc|desc`
- **Filter:** `?filter=authorId`

**Example:**
```http
GET /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc
```

---
## ❌ Error Responses
All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": {
    "details": "Error details"
  }
}
```

---

🚀 **Happy Coding!** 🏆

