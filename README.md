# AI Page Editor

Chat-driven landing page editor: describe changes in plain English, preview the result, then apply or discard before the next turn.

**[Live demo](https://ai-page-editor-murex.vercel.app)**

Try: *“Make the hero headline shorter and more playful”* · *“Change the primary CTA to Get started free”* · *“Rewrite testimonials for a developer audience”*

## How it works

1. Type what to change in the chat (assistant reply streams on the left).
2. When the reply finishes, the preview shows a **proposal** (amber banner).
3. **Apply** commits the page for the next message; **Discard** drops it.

The API key stays on the server (`/api/chat`), never in the browser.

## Design decisions

- **Proposal before apply** — The model can miss or break structure. Users review changes before they affect the next request.
- **Full page JSON in a fenced block** — Easier to parse reliably than partial patches; JSON is hidden in the chat UI.
- **Only applied content goes to the API** — `pageContent` in state is the source of truth; proposals are preview-only.
- **Zod on client and server** — Same schema for assistant output and `/api/chat` request bodies.
- **Unit tests on parsers** — JSON extraction and error parsing are deterministic; the LLM stream is exercised manually via the demo.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Vercel AI SDK · OpenAI (`gpt-4o-mini`) · Zod · Vitest · GitHub Actions · Vercel

## Quick start

```bash
npm install
cp .env.example .env
# Set OPENAI_API_KEY in .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run test    # unit tests
npm run lint
npm run build
```

## Project layout

```
api/          POST /api/chat (Vercel)
server/       Streaming, prompts, request validation
src/editor/   Chat, preview, apply / discard
src/landing/  Page UI and content schema
src/hooks/    Committed page vs proposal state
src/lib/      Parse assistant JSON, chat errors
vite/         Local dev — proxies /api/chat
```
