import { z } from 'zod'
import { landingPageContentSchema } from '../src/landing/contentSchema.js'

const textPartSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
})

const uiMessagePartSchema = z.union([
  textPartSchema,
  z.looseObject({ type: z.string() }),
])

const uiMessageSchema = z.looseObject({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  parts: z.array(uiMessagePartSchema).min(1),
})

export const chatRequestSchema = z.object({
  messages: z.array(uiMessageSchema).min(1),
  pageContent: landingPageContentSchema,
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
