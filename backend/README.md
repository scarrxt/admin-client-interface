# Backend Documentation

Express API for the portfolio and admin dashboard.

## Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing with `bcryptjs`

## Responsibilities

- Serve public portfolio data (bio, projects)
- Store contact form submissions
- Authenticate admin users with JWT
- Provide protected admin APIs for content and account management

## Directory Structure

```text
backend/
├─ config/
│  └─ db.js
├─ middleware/
│  └─ auth.js
├─ models/
│  ├─ Admin.js
│  ├─ Bio.js
│  ├─ Message.js
│  └─ Project.js
├─ routes/
│  ├─ adminRoutes.js
│  └─ publicRoutes.js
├─ utils/
│  └─ ensureDefaultAdmin.js
├─ server.js
├─ .env.example
└─ package.json
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required:
- `MONGO_URI` → MongoDB connection string
- `JWT_SECRET` → Secret used to sign/verify JWTs

Optional:
- `PORT` (default: `5000`)
- `ADMIN_USERNAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_PROFILE_IMAGE`

## Scripts

- `npm run dev` → Start with nodemon
- `npm start` → Start with Node.js

## Startup Flow

1. Loads environment variables with `dotenv`
2. Connects to MongoDB via `connectDB()`
3. Runs `ensureDefaultAdmin()` to create an admin if missing
4. Starts Express server

## Data Models

- **Admin**: `username`, `email`, `password` (hashed), `profileImage`
- **Bio**: `content`
- **Project**: `projectName`, `title`, `description`, `imageUrl`
- **Message**: `name`, `email`, `message`

## Authentication

- Login route: `POST /api/admin/login`
- On success, server returns JWT (`expiresIn: 7d`)
- Protected routes require: `Authorization: Bearer <token>`
- Middleware: `middleware/auth.js`

## API Endpoints

### Health
- `GET /api/health`

### Public
- `GET /api/public/bio`
- `GET /api/public/projects`
- `POST /api/public/messages`

### Admin
- `POST /api/admin/login` (public)
- `GET /api/admin/me`
- `PUT /api/admin/profile`
- `PUT /api/admin/bio`
- `PUT /api/admin/password`
- `PUT /api/admin/password/reset`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `GET /api/admin/messages`

## Security Notes

- Keep `.env` private and never commit real secrets
- Use a strong, random `JWT_SECRET`
- Enforce strong admin passwords
- Restrict MongoDB Atlas network access to trusted IP ranges
