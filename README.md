# CareerPilot AI — Simple Overview

CareerPilot AI is a full-stack web app to help job seekers manage applications, improve resumes with AI, and prepare for interviews. It is built with Next.js for the frontend and Express for the backend.

This repository contains two main folders:
- `api` — the Express backend (runs on port 3001 by default)
- `web` — the Next.js frontend (runs on port 3000 by default)

What you can do with this project
- Register and sign in (JWT authentication)
- Track job applications and update status
- Paste a resume or job description and get an AI summary
- Send messages through the contact form (SMTP)
- View a simple dashboard with your stats

Quick start (development)

1. Start the backend:

```bash
cd api
npm install
# use dotenv or set environment variables, then:
node -r dotenv/config index.js
```

2. Start the frontend in another terminal:

```bash
cd web
npm install
npm run dev
```

Open the site at: http://localhost:3000

API basics
- `POST /auth/register` — register a user
- `POST /auth/login` — login and receive a token
- `GET /applications` — list applications
- `POST /applications` — add an application
- `POST /resume/summary` — send resume text and get a summary
- `POST /contact` — send a contact message (email)

Environment variables
Create `api/.env` with at least:

```
AUTH_SECRET=your_jwt_secret
PORT=3001
FRONTEND_ORIGIN=http://localhost:3000
```

To enable emails (Gmail example):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=you@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=you@gmail.com
CONTACT_NOTIFY_EMAIL=you@gmail.com
DEBUG_EMAILS=true
```

See `api/README.md` and `web/README.md` for more details.

Contributing
- Fork the repo, create a feature branch, and open a PR.

License
- MIT

Enjoy — tell me if you want the README shortened or translated.
