# TaskFlow — Full Stack Project Management App

A production-ready full stack web application for managing projects and tasks with JWT authentication, role-based access control, API key support, rate limiting, and logging.

**Live Demo:**
- Frontend: https://taskflow-api-1.vercel.app/login
- Backend API: https://taskflow-api-1-zlrw.onrender.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Logging | Morgan |
| Rate Limiting | express-rate-limit |
| Deployment | Vercel (frontend), Render (backend) |

---

## Features

- ✅ User registration and login with hashed passwords
- ✅ JWT-based authentication
- ✅ Protected routes with auth middleware
- ✅ Role-based access control (user / admin)
- ✅ Create and manage projects
- ✅ Create, update, and delete tasks
- ✅ Task status tracking (todo / in-progress / done)
- ✅ Task priority levels (low / medium / high)
- ✅ Assign tasks to project members
- ✅ API key generation and middleware
- ✅ Rate limiting (100 requests / 15 mins)
- ✅ Request logging with Morgan
- ✅ Global error handling middleware

---

## Folder Structure

```
taskflow-api/                     ← Root repo
├── taskflow-api/                 ← Backend (Express + MongoDB)
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── projectController.js
│       │   ├── taskController.js
│       │   └── apiKeyController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── roleMiddleware.js
│       │   ├── apiKeyMiddleware.js
│       │   └── errorMiddleware.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Project.js
│       │   ├── Task.js
│       │   └── ApiKey.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── projectRoutes.js
│       │   ├── taskRoutes.js
│       │   └── apiKeyRoutes.js
│       └── server.js
│
└── taskflow-frontend/            ← Frontend (React + Vite)
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── ProjectDetail.jsx
        ├── App.jsx
        └── main.jsx
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### Projects

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/projects` | Create a new project | Yes |
| GET | `/api/projects` | Get all user projects | Yes |
| DELETE | `/api/projects/:id` | Delete a project | Yes (owner/admin) |

### Tasks

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

### API Keys

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/keys/generate` | Generate an API key | Yes |

---

## Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/saiprakash025/taskflow-api.git
cd taskflow-api
```

### 2. Setup Backend

```bash
cd taskflow-api
npm install
```

Create a `.env` file inside `taskflow-api/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd ../taskflow-frontend
npm install
```

Create a `.env` file inside `taskflow-frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Environment Variables

### Backend (`taskflow-api/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`taskflow-frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## Sample API Requests

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "sai",
  "email": "sai1@example.com",
  "password": "12345"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "sai1@example.com",
  "password": "12345"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Create Project (with token)

```http
POST /api/projects
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "My First Project"
}
```

---

## Deployment

### Backend → Render

| Setting | Value |
|---|---|
| Root Directory | `taskflow-api` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

### Frontend → Vercel

| Setting | Value |
|---|---|
| Root Directory | `taskflow-frontend` |
| Framework Preset | Vite |

Add environment variable: `VITE_API_URL` = your Render backend URL

> The `vercel.json` file inside `taskflow-frontend/` handles React Router redirects so all routes like `/login` and `/register` work correctly on Vercel.

---

## Author

**Sai Prakash**
GitHub: [@saiprakash025](https://github.com/saiprakash025)
