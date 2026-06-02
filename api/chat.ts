import { createChatResponse, HttpStatus, INVALID_REQUEST_JSON } from '../server/index.js'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: INVALID_REQUEST_JSON }, { status: HttpStatus.BadRequest })
  }

  return createChatResponse(body)
}
