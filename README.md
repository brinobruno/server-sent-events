# SSE: Server Sent Events
Proof of concept...

### Getting started
application is divided into client (React-ts vite template) and server (Node with fastify-ts), the idea is to run them separately in different localhost ports (5173 for client and 3000 for server).

Open a terminal:

```bash
cd client
pnpm install
pnpm dev
```

Split a second terminal:
```bash
cd server
pnpm install
pnpm dev
```

Open browser at `localhost:5173`