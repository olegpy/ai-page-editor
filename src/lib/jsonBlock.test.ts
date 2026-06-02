import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { parseJsonBlock } from './jsonBlock'

const simpleSchema = z.object({ title: z.string() })

describe('parseJsonBlock', () => {
  it('parses and validates fenced JSON', () => {
    const result = parseJsonBlock('```json\n{"title":"Ship it"}\n```', simpleSchema)
    expect(result).toEqual({ data: { title: 'Ship it' }, error: null })
  })

  it('reports a missing fence', () => {
    const result = parseJsonBlock('no block here', simpleSchema)
    expect(result.data).toBeNull()
    expect(result.error).toBe('No JSON block found in the assistant reply.')
  })

  it('reports invalid JSON', () => {
    const result = parseJsonBlock('```json\n{not json}\n```', simpleSchema)
    expect(result.data).toBeNull()
    expect(result.error).toBe('Assistant JSON is not valid.')
  })

  it('reports schema mismatch', () => {
    const result = parseJsonBlock('```json\n{"title":1}\n```', simpleSchema)
    expect(result.data).toBeNull()
    expect(result.error).toBe('JSON does not match the expected schema.')
  })
})
