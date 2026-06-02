import type { IncomingMessage, ServerResponse } from 'node:http'
import { CHAT_REQUEST_FAILED, createChatResponse } from '../server'

type ConnectNext = (error?: unknown) => void

async function readRawBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk as Buffer)
  }
  return Buffer.concat(chunks)
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const raw = await readRawBody(req)
  return JSON.parse(raw.toString('utf8'))
}

function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

async function sendWebResponse(webResponse: Response, res: ServerResponse): Promise<void> {
  res.statusCode = webResponse.status
  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  if (!webResponse.body) {
    res.end()
    return
  }

  const reader = webResponse.body.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    res.write(value)
  }
  res.end()
}

async function handleChatPost(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const body = await readJsonBody(req)
  const webResponse = await createChatResponse(body)
  await sendWebResponse(webResponse, res)
}

export async function apiDevMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: ConnectNext,
): Promise<void> {
  if (!req.url?.startsWith('/api/chat')) {
    next()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end('Method Not Allowed')
    return
  }

  try {
    await handleChatPost(req, res)
  } catch (error) {
    const message = error instanceof Error ? error.message : CHAT_REQUEST_FAILED
    sendJson(res, 500, { error: message })
  }
}
