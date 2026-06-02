import { parseJsonBlock } from '../lib/jsonBlock'
import { landingPageContentSchema } from './contentSchema'
import type { LandingPageContent } from './types'

export function parsePageContent(text: string): {
  content: LandingPageContent | null
  error: string | null
} {
  const { data, error } = parseJsonBlock(text, landingPageContentSchema)
  return { content: data, error }
}
