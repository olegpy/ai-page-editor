import { CHAT_REQUEST_FAILED, createChatResponse } from '../server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return await createChatResponse(body)
  } catch (error) {
    const message = error instanceof Error ? error.message : CHAT_REQUEST_FAILED
    return Response.json({ error: message }, { status: 500 })
  }
}
