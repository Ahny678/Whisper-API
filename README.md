# 📢 Whisper API

### A publishing platform with posts, comments, drafts, and trending insights

---

## 🔍 Introduction

Whisper API is a Node.js + Express-powered backend designed for content platforms where **authors** can create and manage **posts and drafts**, and **users** can explore, read, comment, and like posts. With features like **JWT-based authentication**, **cookie-based session storage**, **Sequelize ORM**, **PostgreSQL full-text search**, **cron-driven trending logic**, and **EJS templating**, this API serves as a robust backend engine for content-heavy applications.

Key features:

- User authentication & session management with JWT & cookies
- Authors can create, update, publish/unpublish, and delete posts
- Draft support for unpublished content
- Comments and likes functionality
- Paginated and searchable post feed
- Trending logic using cron + PostgreSQL search vector
- Sequelize ORM with PostgreSQL
- EJS support for SSR-ready templates

---

## 🛠️ Architecture Overview

```plaintext
                 ┌─────────────┐
                 │   Clients   │
                 └────┬────────┘
                      │
                      ▼
            ┌───────────────────┐
            │    Express.js     │
            └────┬────────┬─────┘
                 │        │
                 ▼        ▼
        ┌────────────┐ ┌─────────────┐
        │   Routes   │ │    Cron     │
        └────┬───────┘ └──────┬──────┘
             ▼                ▼
     ┌─────────────┐   ┌─────────────┐
     │ Controllers │   │ TrendingJob│
     └────┬────────┘   └──────┬──────┘
          ▼                   ▼
     ┌─────────────┐   ┌─────────────┐
     │Middlewares  │   │  Sequelize  │
     └────┬────────┘   └──────┬──────┘
          ▼                   ▼
     ┌──────────────┐  ┌───────────────┐
     │ PostgreSQL DB│  │ Search Vector │
     └──────────────┘  └───────────────┘
```

## 🚀 Installation (for users)

> Requires: Node.js, npm, PostgreSQL

1. **Clone the repository**

   ```bash
   git clone git@github.com:Ahny678/Whisper-API.git
   cd Whisper-API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Copy .env.example a `.env` file in the root and enter your variables:

4. **Run database migrations**
   Ensure the DB exists, then run:

   ```bash
   npm run migrate
   npx run seed
   ```

5. **Start the server**

   ```bash
   npm start
   ```

---

## 🧑‍💻 Installation (for developers/contributors)

> Everything from user setup **plus**:

1. **Run in dev mode**

   ```bash
   npm run dev
   ```

2. **Lint the code**

   ```bash
   npm run lint
   ```

3. **Contribute using Git**

   - Create feature branches: `git checkout -b feature/your-feature-name`
   - Make PRs to `main` or `dev` branch

---

## 👥 Contributor Expectations

- Write clean, modular code
- Use meaningful commit messages
- Follow RESTful conventions
- Comment complex logic
- Pull latest changes before pushing
- Open PRs with a clear summary of changes
- Be respectful in reviews and feedback

---

## ⚠️ Known Issues / To-Do

- ❗ Drafts cannot be scheduled for auto-publish yet
- 🔐 No rate limiting or brute-force protection
- 📥 File/image upload support for posts is not implemented
- 🌐 Admin dashboard UI (for moderation) is a future goal
- 🧪 Tests are minimal (needs test coverage for all major routes)
