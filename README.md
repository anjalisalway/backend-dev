# backend-dev

My notes-and-code repo for learning backend development with **Node.js + Express**. Each `chapter_X` folder is a self-contained project with its own `package.json` — I build the *same* todo app three times, adding a real backend concept each time.

Each chapter has its own detailed README. This one is the map — the big picture of how the projects connect and how a backend app is generally structured.

---

## Progression

| Chapter | What it adds | Database | Runs via |
|---|---|---|---|
| [chapter_2](./chapter_2_README.md) | Bare Express server, routes & responses | none | `node server.js` |
| [chapter_3](./chapter_3_README.md) | Auth (JWT), routes/middleware structure, todo CRUD | SQLite | `node ...experimental-sqlite` |
| [chapter_4](./chapter_4_README.md) | Same app, production-shaped DB layer | PostgreSQL (via Prisma) | Docker Compose |

Each chapter is meant to be read/run in order — chapter_3 and chapter_4 are literally the same app, just with the database swapped out and Docker introduced.

---

## How a backend project usually flows

1. **Entry point** (`server.js`) — starts the HTTP server, wires up routes/middleware.
2. **Routes** — define URLs (e.g. `/auth/login`, `/todos`) and which function handles each.
3. **Middleware** — runs *before* the route handler (e.g. checking a JWT, parsing the request body).
4. **DB layer** — talks to the database, either directly (`db.js` + SQLite) or through an ORM (Prisma + Postgres).
5. **Config / env** — secrets and connection strings, kept in `.env`, never committed.

```
Client → Route → Middleware (e.g. auth check) → Handler logic → Database
                                                       ↓
Client ← Response ←───────────────────────────────────┘
```

---

## Repo structure

```
backend-dev/
├── chapter_2/            # single-file Express server
├── chapter_3/             # todo app + JWT auth, SQLite
├── chapter_4/             # same todo app, Postgres + Prisma + Docker
├── chapter_2_README.md
├── chapter_3_README.md
├── chapter_4_README.md
└── README.md              # this file
```

---

## Concepts by chapter (quick reference)

- **chapter_2** → what Express actually does: define a route, send a response.
- **chapter_3** → a real app shape: `routes/` + `middleware/` + `db.js`, password hashing with bcrypt, JWTs for auth, SQLite as the simplest possible database (just a file).
- **chapter_4** → the same shape, but the database becomes Postgres, accessed through **Prisma** (schema + migrations + generated client) instead of raw SQL, and the whole stack runs in **Docker** so nothing needs installing locally except Docker itself.
