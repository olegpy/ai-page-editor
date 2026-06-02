import { describe, expect, it } from 'vitest'
import { getChatErrorMessage } from './getChatErrorMessage'

describe('getChatErrorMessage', () => {
  it('extracts error from API JSON body', () => {
    const message = getChatErrorMessage(
      { message: '{"error":"OpenAI API key is not configured."}' },
      'ready',
    )
    expect(message).toBe('OpenAI API key is not configured.')
  })

  it('returns plain text errors unchanged', () => {
    const message = getChatErrorMessage({ message: 'Network request failed' }, 'ready')
    expect(message).toBe('Network request failed')
  })
})
