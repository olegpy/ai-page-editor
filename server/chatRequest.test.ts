import { describe, expect, it } from 'vitest'
import { defaultLandingContent } from '../src/landing/defaultContent'
import { chatRequestSchema } from './chatRequest'

const validRequest = {
  messages: [
    {
      id: 'msg-1',
      role: 'user' as const,
      parts: [{ type: 'text' as const, text: 'Make the headline shorter' }],
    },
  ],
  pageContent: defaultLandingContent,
}

describe('chatRequestSchema', () => {
  it('rejects an empty messages array', () => {
    const result = chatRequestSchema.safeParse({ ...validRequest, messages: [] })
    expect(result.success).toBe(false)
  })

  it('rejects invalid page content', () => {
    const result = chatRequestSchema.safeParse({
      ...validRequest,
      pageContent: { brand: 'Only brand' },
    })
    expect(result.success).toBe(false)
  })
})
