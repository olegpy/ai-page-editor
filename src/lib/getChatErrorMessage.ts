import { CHAT_CLIENT_ERROR } from '../../server/messages'

export function getChatErrorMessage(
  error: { message: string } | undefined,
  status: string,
): string | null {
  if (error?.message) {
    return error.message
  }

  if (status === 'error') {
    return CHAT_CLIENT_ERROR
  }

  return null
}
