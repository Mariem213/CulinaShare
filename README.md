# 🍽️ CulinaShare — Gourmet Recipe Platform

> *Elevate your home cooking.*

CulinaShare is a full-stack recipe discovery and sharing platform built with **Next.js 16**, **MongoDB**, and **Material UI**. It lets food lovers search thousands of recipes, explore curated collections, and — for admins — manage a community recipe database through a protected dashboard.

---

## 📌 Table of Contents

- [🍽️ CulinaShare — Gourmet Recipe Platform](#️-culinashare--gourmet-recipe-platform)
  - [📌 Table of Contents](#-table-of-contents)
  - [About the Project](#about-the-project)
  - [Target Users](#target-users)
  - [Live Demo](#live-demo)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [UI Screens](#ui-screens)
    - [🏠 Home Page](#-home-page)
    - [🔍 Recipe Search](#-recipe-search)
    - [📄 Recipe Detail Page (`/recipe/[id]`)](#-recipe-detail-page-recipeid)
    - [🌍 Community Recipes (`/community-recipes`)](#-community-recipes-community-recipes)
    - [🎲 Random Recipe (`/random`)](#-random-recipe-random)
    - [🔐 Login Page (`/login`)](#-login-page-login)
    - [🛠️ Admin Dashboard (`/dashboard`)](#️-admin-dashboard-dashboard)
  - [Database Schemas](#database-schemas)
    - [👤 User](#-user)
    - [🍲 Recipe](#-recipe)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Authentication \& Authorization](#authentication--authorization)
  - [Available Scripts](#available-scripts)
  - [Contributing](#contributing)
  - [License](#license)

---

## About the Project

CulinaShare is a recipe platform that combines a **static-generated** editorial section with a **client-side-rendered** live search, backed by both the public [TheMealDB API](https://www.themealdb.com/api.php) and a private MongoDB collection for community-submitted recipes.

Key highlights:

- **Hybrid rendering** — SSG for featured "Editor's Pick" recipes, CSR for the live search experience
- **Role-based access control** — only `admin` users can access the `/dashboard` management panel
- **JWT session management** — sessions are encrypted with `jose` and stored as `httpOnly` cookies
- **Community recipes** — stored in MongoDB and served via internal API routes
- **Responsive design** — built with Material UI v7 and Tailwind CSS v4

---

## Target Users

| User Type | Description |
|-----------|-------------|
| **Home Cooks** | Browse and search thousands of recipes by name, ingredient, or cuisine |
| **Food Enthusiasts** | Discover curated editorial picks and explore global cuisines |
| **Community Contributors** | Submit and share personal recipes to the community section |
| **Admins** | Manage community recipes via a protected dashboard |

---

## Live Demo

> 🚧 **Deployment URL:** `https://culinashare-ten.vercel.app/` *(update with your actual URL)*

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | Material UI v7 + Tailwind CSS v4 |
| **Database** | MongoDB via Mongoose 8 |
| **Authentication** | Custom JWT sessions with `jose` |
| **Validation** | Zod |
| **Fonts** | Google Fonts — Playfair Display, Lato |
| **External API** | [TheMealDB](https://www.themealdb.com/api.php) |
| **Deployment** | Vercel (recommended) |

---

## Project Structure

```
src/app/
├── about/                  # About page
├── actions/                # Next.js Server Actions
├── api/                    # API route handlers
├── community-recipes/      # Community recipe listing page
├── components/             # Shared UI components (Navbar, RecipeSearch, etc.)
├── dashboard/              # Admin dashboard (protected route)
├── login/                  # Login page
├── random/                 # Random recipe feature
├── recipe/                 # Individual recipe detail pages
├── globals.css             # Global styles
├── layout.tsx              # Root layout with Navbar & Footer
└── page.tsx                # Home page (SSG featured + CSR search)

src/lib/
├── auth.ts                 # JWT encrypt/decrypt, login, logout, getSession
├── definitions.ts          # Zod schemas & TypeScript types
└── mongodb.ts              # Mongoose connection with global cache

src/models/
├── User.ts                 # User Mongoose model
└── Recipe.ts               # Recipe Mongoose model

middleware.ts               # Route protection for /dashboard
next.config.ts              # Next.js image domains config
```

---

## UI Screens

### 🏠 Home Page
- **Hero section** with an editorial headline and tagline
- **Editor's Pick** — 3 featured chicken recipes fetched at build time (SSG) from TheMealDB, displayed as hoverable cards with smooth lift animations
- **Find Your Craving** — live CSR search bar powered by TheMealDB's search endpoint

### 🔍 Recipe Search
- Real-time recipe search by keyword
- Results display recipe name, category, cuisine area, and thumbnail

### 📄 Recipe Detail Page (`/recipe/[id]`)
- Full recipe detail: image, category, area, and step-by-step instructions
- Supports both TheMealDB recipes (by external ID) and community recipes (from MongoDB)

### 🌍 Community Recipes (`/community-recipes`)
- Recipes submitted by users and stored in MongoDB
- Browsable listing with card layout

### 🎲 Random Recipe (`/random`)
- Fetches and displays a random recipe from TheMealDB

### 🔐 Login Page (`/login`)
- Email + password form with Zod validation
- On success, creates an encrypted `httpOnly` JWT session cookie

### 🛠️ Admin Dashboard (`/dashboard`)
- **Protected** — requires an authenticated session with `role: "admin"`
- CRUD management for community recipes in MongoDB
- Redirects non-admin users to 404; unauthenticated users to `/login`

---

## Database Schemas

### 👤 User

```ts
{
  email:     String   // required, unique
  password:  String   // required (plain-text — hash in production!)
  name:      String   // required
  role:      String   // default: "user" | "admin"
  createdAt: Date     // auto (timestamps)
  updatedAt: Date     // auto (timestamps)
}
```

> ⚠️ **Security Note:** Passwords are currently stored and compared as plain text. Before going to production, integrate `bcrypt` for hashing.

### 🍲 Recipe

```ts
{
  name:         String   // required
  category:     String   // required (e.g. "Chicken", "Dessert")
  area:         String   // required (e.g. "Italian", "Egyptian")
  instructions: String   // required — full cooking steps
  thumb:        String   // optional image URL, default: '/placeholder.jpg'
  createdAt:    Date     // auto (timestamps)
  updatedAt:    Date     // auto (timestamps)
}
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/recipe-platform.git
cd recipe-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# → Edit .env.local with your values (see below)

# 4. Seed an admin user (optional — see note below)
# Run a one-time script or use MongoDB Compass to insert a user with role: "admin"

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/recipe-platform?retryWrites=true&w=majority
```

> 🔑 The JWT secret key is currently hardcoded in `src/lib/auth.ts`. Move it to an environment variable before deploying:
> ```env
> SESSION_SECRET=your-very-long-random-secret-key
> ```

---

## Authentication & Authorization

CulinaShare uses a **custom JWT-based session** (no NextAuth):

| Step | Detail |
|------|--------|
| **Login** | `login()` in `auth.ts` checks credentials against MongoDB, creates a signed JWT, and stores it as an `httpOnly` cookie |
| **Session** | `getSession()` decrypts the cookie and returns the user payload (email, name, role) |
| **Middleware** | `middleware.ts` intercepts all `/dashboard/*` routes — redirects unauthenticated users to `/login` and non-admins to `/404` |
| **Logout** | `logout()` deletes the session cookie |

---

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is for educational/portfolio purposes. See `LICENSE` for details.

---

<div align="center">
  <strong>CulinaShare</strong> — Crafted with Next.js & Material Design
</div>
