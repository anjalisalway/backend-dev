# Chapter 2 — Bare-bones Express Server

The starting point. No database, no folder structure — just one file to understand how a Node.js server actually boots and responds to requests.

## What this covers
- Creating an Express app
- Defining a couple of basic routes
- Understanding `req` and `res`
- Starting a server on a port

## Project Structure

```
chapter_2/
├── server.js         # everything lives here
├── package.json
├── package-lock.json
└── test.rest         # sample requests to test endpoints
```

## Getting Started

1. **Install dependencies**

```bash
cd chapter_2
npm install
```

2. **Run the server**

```bash
node server.js
```

(If a `dev` script with nodemon is set up, `npm run dev` will auto-restart on save.)

3. **Access the app**

Open `http://localhost:3000` (or whatever port is set inside `server.js`) in your browser or via `curl`.

## Testing Endpoints

Use `test.rest` with the **REST Client** VS Code extension — open the file and click "Send Request" above each block.

## Key takeaway

This is the entire request/response cycle in its simplest form:

```
Client → server.js (route handler) → Response
```

Everything in chapter_3 and chapter_4 is this same idea, just split into more files as the app grows.