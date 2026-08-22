# Chapter 3 — Todo App with SQLite (Node.js + Express + JWT)

An authentication-protected Todo App using **Node.js**, **Express.js**, **bcrypt**, **JWT authentication**, and **SQLite**. Users can register, log in, and perform CRUD operations on their own todos.

## What this covers
- Splitting a server into routes / middleware / db layers
- Password hashing with bcrypt
- JWT-based authentication (login → token → protected routes)
- SQLite as a zero-setup database (just a local file, no Docker needed)
- Node's built-in experimental SQLite module

## Project Structure

```
chapter_3/
├── public/
│   └── index.html              # simple frontend for auth + todo management
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js    # verifies JWT, protects routes
│   ├── routes/
│   │   ├── authRoutes.js        # register / login
│   │   └── todoRoutes.js        # CRUD for todos (protected)
│   ├── db.js                    # SQLite setup + table creation
│   └── server.js                # Express app entry point
├── .env                         # JWT_SECRET, PORT
├── package.json
├── package-lock.json
└── test.rest                    # sample requests to test endpoints
```

## Requirements

This app needs **Node.js v22 or higher** — it uses Node's experimental SQLite module.

```bash
node -v
```

If you're below v22, install it with `nvm`:

```bash
nvm install 22
nvm use 22
```

## Getting Started

1. **Install dependencies**

```bash
cd chapter_3
npm install
```

2. **Set up environment variables**

Create a `.env` file:

```bash
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

3. **Run the server**

Because of the experimental SQLite module, the server needs to be started with special flags:

```bash
node --env-file=.env --experimental-sqlite ./src/server.js
```

Or, if a script is set up in `package.json`:

```json
"scripts": {
  "dev": "nodemon --env-file=.env --experimental-sqlite ./src/server.js"
}
```

```bash
npm run dev
```

4. **Access the app**

Open `http://localhost:5000` (or `localhost:3000` if you changed `PORT` in `.env`) in your browser.

## Testing the API

Use `test.rest` with the **REST Client** VS Code extension:

1. Send the **register** request.
2. Send the **login** request → copy the JWT token from the response.
3. Paste it into `{{token}}` for the protected todo routes (fetch/add/update/delete).

## Key takeaway

This chapter introduces the real backend pattern used everywhere:

```
Route → Middleware (check JWT) → Handler logic → DB (SQLite) → Response
```

Chapter 4 rebuilds this exact same app, just swapping SQLite for Postgres + Prisma + Docker.