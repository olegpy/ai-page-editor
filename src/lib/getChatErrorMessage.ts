import { CHAT_CLIENT_ERROR } from '../../server/messages'

function parseApiError(text: string): string | null {
  if (!text.trim().startsWith('{')) return null

  try {
    const error = (JSON.parse(text) as { error?: string }).error
    return error?.trim() ?? null
  } catch {
    return null
  }
}

export function getChatErrorMessage(
  error: { message: string } | undefined,
  status: string,
): string | null {
  if (error?.message) {
    return parseApiError(error.message) ?? error.message
  }

  if (status === 'error') {
    return CHAT_CLIENT_ERROR
  }

  return null
}
