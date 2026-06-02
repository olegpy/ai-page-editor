import { CHAT_REQUEST_FAILED, createChatResponse, HttpStatus } from '../server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return await createChatResponse(body)
  } catch (error) {
    const message = error instanceof Error ? error.message : CHAT_REQUEST_FAILED
    return Response.json({ error: message }, { status: HttpStatus.InternalServerError })
  }
}
