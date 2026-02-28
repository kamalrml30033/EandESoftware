# Deploy E and E Software (free tier)

Deploy **frontend** (Vercel), **backend** (Render), and **database** (Neon or Render PostgreSQL) for free.

---

## Credentials – where to get them and where to set them

**Rule:** Never put database passwords, API keys, or JWT secrets in code or in GitHub. Use environment variables only.

| Credential | Where you get it | Where you set it |
|------------|------------------|------------------|
| **Database URL** | Neon: Connection details → build JDBC URL.<br>Render Postgres: Internal/External URL → convert to JDBC. | **Render** (backend service) → Environment → `SPRING_DATASOURCE_URL` |
| **DB username** | Neon: Connection details → User.<br>Render: from the Postgres URL. | **Render** → Environment → `SPRING_DATASOURCE_USERNAME` |
| **DB password** | Neon: Connection details → Password.<br>Render: from the Postgres URL. | **Render** → Environment → `SPRING_DATASOURCE_PASSWORD` |
| **JWT secret** | You choose: long random string (e.g. 32+ chars). Optional in dev. | **Render** → Environment → `JWT_SECRET` (optional; app has a default) |
| **Backend URL** | After deploying backend on Render: e.g. `https://your-service.onrender.com` | **Vercel** → Project → Settings → Environment Variables → `VITE_API_URL` |
| **Frontend URL** | After deploying frontend on Vercel: e.g. `https://your-app.vercel.app` | **Render** (backend) → Environment → `ALLOWED_ORIGINS` (so CORS allows your UI) |

**Summary:** Database credentials and `ALLOWED_ORIGINS` live in **Render** (backend). The backend URL lives in **Vercel** (frontend).

---

## 1. Free database (Neon or Render)

### Option A: Neon (recommended – free tier, no credit card)

1. Go to [neon.tech](https://neon.tech) and sign up (GitHub is fine).
2. Create a new project (e.g. `ee-software`), region closest to you.
3. After creation, open **Connection details**.
4. Note:
   - **Host** (e.g. `ep-xxx.us-east-2.aws.neon.tech`)
   - **Database name** (e.g. `neondb`)
   - **User** and **Password**
5. Build the JDBC URL (use **SSL**):
   ```text
   jdbc:postgresql://HOST:5432/DATABASE?sslmode=require
   ```
   Example: `jdbc:postgresql://ep-cool-name-123456.us-east-2.aws.neon.tech:5432/neondb?sslmode=require`
6. You will use:
   - `SPRING_DATASOURCE_URL` = that JDBC URL
   - `SPRING_DATASOURCE_USERNAME` = User from Neon
   - `SPRING_DATASOURCE_PASSWORD` = Password from Neon

### Option B: Render PostgreSQL

1. Go to [render.com](https://render.com) → Dashboard → **New +** → **PostgreSQL**.
2. Create a free instance (e.g. `ee-software-db`).
3. After it’s created, open the instance and copy **Internal Database URL** (or **External** if you prefer).
4. Render gives a URL like: `postgres://USER:PASSWORD@HOST/DATABASE`.
5. Convert to JDBC:
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://HOST:5432/DATABASE` (replace HOST/DATABASE from the URL; if there’s a port in the host, use it).
   - `SPRING_DATASOURCE_USERNAME` = USER from the URL.
   - `SPRING_DATASOURCE_PASSWORD` = PASSWORD from the URL.

---

## 2. Backend on Render (free)

1. Go to [render.com](https://render.com) and sign up (GitHub is fine).
2. **New +** → **Blueprint**.
3. Connect the repo: **https://github.com/kamalrml30033/EandESoftware**.
4. Render will read `render.yaml` from the repo and create a **Web Service** for the backend.
5. Open the new service → **Environment** and set:

   | Key | Value |
   |-----|--------|
   | `SPRING_DATASOURCE_URL` | Your JDBC URL (from step 1) |
   | `SPRING_DATASOURCE_USERNAME` | DB user |
   | `SPRING_DATASOURCE_PASSWORD` | DB password |
   | `ALLOWED_ORIGINS` | Your Vercel app URL (step 3), e.g. `https://e-and-e-software.vercel.app` |
   | `JWT_SECRET` | (Optional) long random string; Render can generate one. |

6. Save. Render will build and deploy. Wait until the service is **Live**.
7. Copy the backend URL (e.g. `https://e-and-e-backend.onrender.com`). You need it for the frontend.

**If build fails:** Ensure the repo has a `backend` folder with a Maven project. If Render doesn’t have Maven, add the [Maven Wrapper](https://maven.apache.org/wrapper/) to `backend/` and in `render.yaml` set `buildCommand: ./mvnw clean package -DskipTests`.

---

## 3. Frontend on Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign up (GitHub is fine).
2. **Add New** → **Project** → import **https://github.com/kamalrml30033/EandESoftware**.
3. Configure:
   - **Root Directory:** `frontend` (important).
   - **Framework Preset:** Vite (should be detected).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables** – add one:

   | Name | Value |
   |------|--------|
   | `VITE_API_URL` | Your Render backend URL (e.g. `https://e-and-e-backend.onrender.com`) |

5. Deploy. Vercel will build and give you a URL (e.g. `https://e-and-e-software.vercel.app`).

---

## 4. Connect frontend and backend

1. **Render (backend):** In the service **Environment**, set:
   - `ALLOWED_ORIGINS` = your Vercel URL (e.g. `https://e-and-e-software.vercel.app`).
2. Redeploy the backend if you changed env (Render → **Manual Deploy** → **Deploy latest commit**).

Now the UI at the Vercel URL will call the API on Render and use the free database.

---

## Summary

| What | Where | URL / Env |
|------|--------|-----------|
| Database | Neon or Render PostgreSQL | `SPRING_DATASOURCE_*` on Render |
| Backend | Render (Web Service) | e.g. `https://e-and-e-backend.onrender.com` |
| Frontend | Vercel | e.g. `https://e-and-e-software.vercel.app` → set `VITE_API_URL` and `ALLOWED_ORIGINS` |

**Free tier notes:**

- **Render free:** Service may spin down after inactivity; first request can be slow.
- **Neon free:** Limited compute/storage; enough for small apps.
- **Vercel free:** Generous for static/Vite apps.

If you hit limits, consider a single free Postgres and one backend + one frontend as above.
