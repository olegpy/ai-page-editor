# AI Page Editor

Edit a landing page through conversation with an AI agent. Chat text streams on the left (JSON blocks are hidden in the thread); the preview switches to the proposed page when the reply finishes, then **Apply** commits it for the next turn.

**Live demo:** _add your Vercel URL after deploy_  
**Repository:** _add your GitHub URL_

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Vercel AI SDK + OpenAI (`gpt-4o-mini`)
- Zod for page content validation

## Quick start

```bash
npm install
cp .env.example .env
# Set OPENAI_API_KEY in .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Editing flow

1. Describe a change in the chat (e.g. “Make the headline shorter”).
2. The assistant streams a reply and returns updated page JSON in a fenced `json` block.
3. The preview shows the **proposal** (amber banner) without committing it.
4. **Apply changes** updates the page sent on the next request; **Discard** reverts the preview.

The API key stays on the server (`/api/chat`), never in the browser.

## Project structure

```
api/                 Vercel serverless entry points (thin HTTP layer)
server/              Shared server logic (chat, prompts, validation)
  chat.ts            streamText + OpenAI
  chatPrompt.ts
  chatRequest.ts     Zod request schema
  messages.ts        User-facing API error copy

src/
  editor/            Chat UI, preview, apply/discard components
  hooks/             React hooks (e.g. usePageEditor)
  landing/           Page UI + content model (index.ts for client; server uses types/schema paths)
  lib/               Reusable helpers (extract/parse assistant JSON, message display)

vite/                Dev-only: mirrors /api/* locally (not deployed)
```

## Architecture

```
Browser (React)
  → POST /api/chat { messages, pageContent }

Local dev:  vite/apiDevMiddleware → server/chat.ts
Production: api/chat.ts           → server/chat.ts → OpenAI
```

- `vite.config.ts` middleware does **not** run in production.
- Env: local `.env` loaded by `vite/apiDevPlugin.ts`; on Vercel set `OPENAI_API_KEY` in the dashboard.

## Deploy (Vercel)

1. Push to GitHub and import the project in [Vercel](https://vercel.com).
2. Add environment variable: `OPENAI_API_KEY`.
3. Deploy. Routes under `api/` run as serverless functions; the SPA is served from `dist/`.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Vite + local `/api/chat` middleware      |
| `npm run build`   | Typecheck + production build             |
| `npm run preview` | Preview production build                 |
| `npm run lint`    | ESLint                                   |

## Demo ideas for reviewers

- “Make the hero headline shorter and more playful”
- “Change the primary CTA to Get started free”
- “Rewrite the testimonials section for a developer audience”
