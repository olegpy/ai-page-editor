import type { z } from 'zod'

const FENCED_JSON = /```(?:json)?\s*([\s\S]*?)```/i

export function extractJsonBlock(text: string): string | null {
  const match = text.match(FENCED_JSON)
  return match?.[1]?.trim() ?? null
}

export function stripJsonFence(text: string): string {
  const stripped = text.replace(/```(?:json)?\s*[\s\S]*?```/gi, '').trim()
  return stripped.length > 0 ? stripped : text.trim()
}

export function parseJsonBlock<T>(
  text: string,
  schema: z.ZodType<T>,
): { data: T | null; error: string | null } {
  const jsonText = extractJsonBlock(text)
  if (!jsonText) {
    return { data: null, error: 'No JSON block found in the assistant reply.' }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { data: null, error: 'Assistant JSON is not valid.' }
  }

  const result = schema.safeParse(parsed)
  if (!result.success) {
    return { data: null, error: 'JSON does not match the expected schema.' }
  }

  return { data: result.data, error: null }
}
