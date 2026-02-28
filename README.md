# E and E Software Solution

Starter full-stack project: **React (Vite)** frontend + **Java Spring Boot 3.x** backend.

## Features

- **Backend:** JWT auth (Admin / User), PostgreSQL, JPA entities (Service, Course), **free AI chat** (company knowledge base; optional Groq free tier), WebSocket live chat, REST APIs.
- **Frontend:** TanStack Query, Tailwind CSS (Enterprise Blue theme), Login/Register, Dashboard with **videos & gallery**, **course/service detail + related content**, floating AI Chat widget (works for all visitors), Admin panel.

## Prerequisites

- **JDK 17**, **Node.js 18+**, **PostgreSQL** (running locally or adjust `application.yml`).
- Optional: **GROQ_API_KEY** for enhanced AI chat (free at [console.groq.com](https://console.groq.com)); otherwise the chat uses the built-in knowledge base.

## Quick start

### 1. Database

Create a PostgreSQL database and user:

```sql
CREATE DATABASE ee_software;
-- Use your postgres user or create one; set password in application.yml.
```

Update `backend/src/main/resources/application.yml` if needed:

```yaml
spring.datasource.url: jdbc:postgresql://localhost:5432/ee_software
spring.datasource.username: postgres
spring.datasource.password: your_password
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Or with Maven installed: `mvn spring-boot:run`.  
Server: **http://localhost:8080**.

(Optional) For enhanced AI chat (free), get a key at [Groq](https://console.groq.com) and set:

```bash
set GROQ_API_KEY=gsk_...
```

If the backend fails to start due to missing OpenAI config, add to `application.yml`:

```yaml
spring.autoconfigure.exclude: org.springframework.ai.openai.autoconfigure.OpenAiAutoConfiguration
```

Then the AI chat will use only the built-in knowledge base.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: **http://localhost:5173**.  
Vite proxy forwards `/api` and `/ws` to the backend.

### 4. First user

- Open http://localhost:5173 → Register with email/password.
- Check **Register as Admin** to get Admin role and access **Admin** (add/edit services).
- Dashboard shows Courses and Services (sample data is created on first backend run).

## API overview

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Register (body: email, password, fullName, admin) |
| POST | /api/auth/login | No | Login (body: email, password) |
| GET | /api/courses | No | List active courses |
| GET | /api/services | No | List active services |
| GET | /api/services/{id} | No | Get one service |
| POST | /api/ai/chat | JWT | AI chat (body: query) |
| GET/POST/PUT/DELETE | /api/admin/services | Admin | CRUD services |
| WebSocket | /ws/chat (SockJS) | - | Live chat; send to /app/chat.send, subscribe /topic/chat |

## Project layout

```
backend/          # Spring Boot
frontend/        # React + Vite + Tailwind
README.md
```

## License

Internal / demo use.
