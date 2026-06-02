import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { getChatPrompt } from './chatPrompt'
import { chatRequestSchema, type ChatRequest } from './chatRequest'
import {
  CHAT_REQUEST_FAILED,
  INVALID_CHAT_REQUEST,
  OPENAI_API_KEY_MISSING,
} from './messages'

export type { ChatRequest }

export async function createChatResponse(body: unknown): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return Response.json({ error: OPENAI_API_KEY_MISSING }, { status: 500 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: INVALID_CHAT_REQUEST }, { status: 400 })
  }

  const { messages, pageContent } = parsed.data

  try {
    const openai = createOpenAI({ apiKey })
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: getChatPrompt(pageContent),
      messages: await convertToModelMessages(messages as UIMessage[]),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    const message = error instanceof Error ? error.message : CHAT_REQUEST_FAILED
    return Response.json({ error: message }, { status: 500 })
  }
}
