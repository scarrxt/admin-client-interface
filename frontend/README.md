# Frontend Documentation

React client for the portfolio and admin dashboard.

## Stack

- React + Vite
- React Router
- Tailwind CSS (via `@tailwindcss/vite`)
- Axios

## Purpose

The frontend provides two experiences:
- **Public site** for portfolio visitors
- **Protected admin dashboard** for content management

## Directory Structure

```text
frontend/
├─ src/
│  ├─ api/
│  │  └─ client.js
│  ├─ components/
│  │  ├─ public/
│  │  └─ admin/
│  ├─ pages/
│  │  ├─ public/
│  │  └─ admin/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .env.example
├─ package.json
└─ vite.config.js
```

## Routes

### Public
- `/` → Homepage (bio, projects, contact form)

### Admin
- `/admin/login` → Admin authentication
- `/admin` → Dashboard overview (protected)
- `/admin/projects` → Project CRUD (protected)
- `/admin/inbox` → Message inbox (protected)
- `/admin/settings` → Profile/bio/password settings (protected)

## API Integration

Configured in `src/api/client.js`:
- Base URL from `VITE_API_URL`
- JWT is stored in `localStorage`
- Token attached to `Authorization` header for protected calls

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required variable:
- `VITE_API_URL=http://localhost:5000/api`

## Scripts

- `npm run dev` → Start local dev server
- `npm run build` → Production build
- `npm run preview` → Preview production build
- `npm run lint` → Run ESLint

## Run Locally

```bash
npm install
npm run dev
```

Default local URL:
- `http://localhost:5173`

## UI Notes

- Minimalist, responsive layout using Tailwind utility classes
- Admin navigation supports desktop sidebar and mobile navigation
- Profile dropdown includes settings shortcut and logout
