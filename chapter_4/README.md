# Chapter 4 — Todo App with Postgres, Prisma & Docker

The same authentication-protected Todo App as chapter_3, rebuilt with **PostgreSQL** (instead of SQLite) accessed through **Prisma**, and fully **Dockerized** — both the Node app and Postgres run in their own containers.

## What this covers
- Swapping a raw SQLite file for a real Postgres database
- Using **Prisma** as an ORM (schema, migrations, generated client)
- Running a multi-container setup with Docker Compose (app + db)
- Connecting to a containerized database directly via `psql`

## Project Structure

```
chapter_4/
├── public/
│   └── index.html              # simple frontend for auth + todo management
├── prisma/
│   ├── schema.prisma            # DB models (User, Todo, etc)
│   └── migrations/              # generated migration files
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js    # verifies JWT, protects routes
│   ├── routes/
│   │   ├── authRoutes.js        # register / login
│   │   └── todoRoutes.js        # CRUD for todos (protected)
│   ├── prismaClient.js          # Prisma client setup
│   └── server.js                # Express app entry point
├── .env                          # DATABASE_URL, JWT_SECRET
├── Dockerfile                    # builds the Node app image
├── docker-compose.yaml           # defines app + postgres containers
├── prisma.config.ts
├── package.json
├── package-lock.json
└── test.rest                     # sample requests to test endpoints
```

## Requirements

- **Docker Desktop** installed and running.

## Getting Started

```bash
cd chapter_4
```

1. **Generate the Prisma client** (reads `prisma/schema.prisma`)

```bash
npx prisma generate
```

2. **Build the Docker images** (app + postgres)

```bash
docker compose build
```

3. **Create and apply migrations** — run this *inside* the app container

```bash
docker compose run app npx prisma migrate dev --name init
```

If migrations already exist (e.g. you pulled someone else's changes) and you just need to apply them:

```bash
docker compose run app npx prisma migrate deploy
```

4. **Boot both containers**

```bash
docker compose up
```

Or run in the background:

```bash
docker compose up -d
```

5. **Access the app**

Open `http://localhost:5003` (or `localhost:3000` if the port was changed) in your browser.

## Working with the database

**Connect directly to Postgres inside the container** (open a new terminal while containers are running):

```bash
docker exec -it postgres-db psql -U postgres -d todoapp
```

From here you can run raw SQL, e.g. `SELECT * FROM "Todo";`, to sanity-check what the app is storing.

**Browse/edit data with a GUI instead:**

```bash
npx prisma studio
```

## Stopping / cleaning up

```bash
docker compose down       # stop containers
docker compose down -v    # stop AND wipe the Postgres volume (fresh DB next time)
docker system prune       # remove all stopped containers/unused images (repo-wide, be careful)
```

## Cheat sheet

```bash
docker compose ps          # see running containers
docker compose logs -f     # tail logs (useful if the DB connection fails)
```

## Testing the API

Use `test.rest` with the **REST Client** VS Code extension — register → login → copy the JWT → paste into `{{token}}` for the protected todo routes.

## Key takeaway

Same request flow as chapter_3, but the database layer is now production-shaped:

```
Route → Middleware (check JWT) → Handler logic → Prisma → Postgres (in Docker) → Response
```

Prisma manages schema + migrations instead of hand-written SQL, and Docker Compose means the whole stack (app + db) can be brought up with one command on any machine — no local Postgres install needed.