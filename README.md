# AI Page Editor

Edit a landing page through chat. The assistant streams on the left; the preview updates when the reply finishes. **Apply** saves changes for the next message.

**Live demo:** _add your Vercel URL after deploy_  
**Repository:** https://github.com/olegpy/ai-page-editor

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

## How it works

1. Type what to change in the chat.
2. The assistant replies (JSON for the page is parsed on the client, not shown in the thread).
3. The preview shows the proposal (amber banner).
4. **Apply** saves it; **Discard** drops it.

`OPENAI_API_KEY` is only used on the server (`/api/chat`), never in the browser.

## Project layout

```
api/          Vercel route: POST /api/chat
server/       OpenAI streaming, prompts, request validation
src/editor/   Chat panel, preview, apply / discard
src/landing/  Landing page UI and content schema
src/hooks/    Page state (committed vs proposal)
src/lib/      Parse assistant JSON for the preview
vite/         Local dev only — proxies /api/chat (not deployed)
```

Locally, `npm run dev` uses `vite/` to call the same `server/` code as production.

## Try it

- “Make the hero headline shorter and more playful”
- “Change the primary CTA to Get started free”
- “Rewrite the testimonials section for a developer audience”
