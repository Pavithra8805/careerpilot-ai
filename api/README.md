# API (Express) — Simple Guide

This folder contains the Express backend. It handles authentication, applications, resume analysis, and emails.

Run locally

```bash
cd api
npm install
# set environment variables (see below), then:
node -r dotenv/config index.js
```

Default URL: http://localhost:3001

Main endpoints
- `POST /auth/register` — register a new user (name, email, password)
- `POST /auth/login` — login and get a JWT token
- `GET /api/protected` — example protected route (send `Authorization: Bearer <token>`)
- `GET /applications` — list saved applications
- `POST /applications` — add an application
- `POST /resume/summary` — analyze resume text
- `POST /contact` — send a contact message (uses SMTP)

Environment variables
Create `api/.env` and add at least:

```
AUTH_SECRET=your_jwt_secret
PORT=3001
FRONTEND_ORIGIN=http://localhost:3000
```

Email (SMTP)
If you want the app to send real emails, add SMTP values. Example for Gmail (use an App Password):

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

Notes
- If `DEBUG_EMAILS=true` the API will return extra info useful for debugging.
- Restart the server after changing `.env`.

Quick test (send contact):

```bash
curl -X POST http://localhost:3001/contact \
	-H "Content-Type: application/json" \
	-d '{"name":"Test","email":"you@example.com","message":"Hello"}'
```
