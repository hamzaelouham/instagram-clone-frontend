# 📸 Instagram Clone (Reloaded 2026)

Welcome back! This is your Instagram Clone project, upgraded and modernized to Next.js 16 and React 19.

## 🏗️ Project Architecture

This is a **monorepo** managed by `pnpm workspaces`.

*   **Frontend** (`/`): Next.js app using Apollo Client & Tailwind CSS.
*   **Backend** (`/backend`): Node.js + Express + Apollo Server + Prisma (PostgreSQL).

## 🚀 Quick Start

### 1. Prerequisites
*   Node.js (v18+)
*   Docker (for the database) -> `docker compose up -d`
*   pnpm (`npm install -g pnpm`)

### 2. Install Dependencies
Run from the *root* folder:
```bash
pnpm install
```

### 3. Start the Backend
The backend runs on port **4000**.
```bash
cd backend
pnpm run dev
```
*   **GraphQL Playground**: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### 4. Start the Frontend
The frontend runs on port **3000**. Open a *new terminal*:
```bash
pnpm run dev
```
*   **App URL**: [http://localhost:3000](http://localhost:3000)

---

## ✅ Feature Status (Verified)

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Authentication** | 🟢 Working | Login, Register, Logout verified. |
| **Feed** | 🟢 Working | Posts load from backend. |
| **Profile** | 🟢 Working | Authenticated user profile loads correctly. |
| **Forgot Password** | 🔴 Missing | UI exists but no backend logic. |
| **Stories** | 🟡 Mocked | UI exists but uses fake data. |
| **Messages** | 🔴 Missing | Not implemented. |

## 📁 Key File Locations

*   **Database Schema**: `backend/prisma/schema.prisma`
*   **Backend Resolvers**: `backend/src/graphql/typeDefs/`
*   **Frontend Pages**: `pages/` (e.g., `auth/index.tsx`, `index.tsx`)
*   **Frontend Components**: `components/`

## 🛠️ Recent Upgrades
*   **Next.js 16 / React 19**: Updated from v12.
*   **Type Safety**: Fixed backend types (`app.ts`, `post.service.ts`).
*   **Security**: Enabled `graphql-shield` and fixed schema typos (`iamge` -> `image`).
