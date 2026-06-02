import type { UIMessage } from 'ai'
import { getMessageText } from './getMessageText'
import { stripJsonFence } from './jsonBlock'

export function getMessageDisplayText(message: UIMessage): string {
  const text = getMessageText(message)
  if (message.role === 'assistant') {
    return stripJsonFence(text)
  }
  return text
}
