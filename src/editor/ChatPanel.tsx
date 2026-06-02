import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, type SubmitEvent } from 'react'
import { getChatErrorMessage, getMessageDisplayText, getMessageText } from '../lib'
import { parsePageContent } from '../landing'
import type { PageEditor } from '../hooks'
import { ProposalActions } from './ProposalActions'

const chatTransport = new DefaultChatTransport({
  api: '/api/chat',
})

type ChatPanelProps = {
  editor: PageEditor
}

export function ChatPanel({ editor }: ChatPanelProps) {
  const {
    pageContent,
    setProposal: onProposal,
    proposalError,
    hasProposal,
    applyAction,
    discardAction,
  } = editor
  const [input, setInput] = useState('')

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: chatTransport,
    onFinish: ({ message, isError }) => {
      if (isError) return

      const { content, error: parseError } = parsePageContent(getMessageText(message))
      onProposal(content, parseError)
    },
  })

  const isBusy = status === 'submitted' || status === 'streaming'

  const chatError = getChatErrorMessage(error, status)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isBusy) return
    onProposal(null, null)
    sendMessage({ text }, { body: { pageContent } })
    setInput('')
  }

  return (
    <section
      id="chat-panel"
      aria-labelledby="chat-heading"
      className="flex h-full min-h-0 flex-col border-r border-white/10 bg-slate-900"
    >
      <header className="border-b border-white/10 px-4 py-3">
        <h1 id="chat-heading" className="text-base font-semibold text-white">
          AI Page Editor
        </h1>
        <p id="chat-description" className="mt-1 text-sm text-slate-400">
          Describe changes, then apply or discard the proposal.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4" aria-busy={isBusy}>
        {messages.length === 0 && (
          <p id="chat-empty-hint" className="mb-3 rounded-lg border border-dashed border-white/10 bg-slate-950/50 p-4 text-sm leading-relaxed text-slate-300">
            Try: &ldquo;Make the headline shorter and more playful&rdquo; or &ldquo;Change the
            primary CTA to Get started free&rdquo;
          </p>
        )}

        <ul
          role="log"
          aria-label="Conversation"
          aria-live="polite"
          aria-relevant="additions"
          aria-describedby={messages.length === 0 ? 'chat-empty-hint' : undefined}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto"
        >
          {messages.map(message => {
            const authorId = `${message.id}-author`
            const authorLabel = message.role === 'user' ? 'You' : 'Assistant'

            return (
              <li key={message.id}>
                <article aria-labelledby={authorId} className="max-w-[95%]">
                  <div
                    className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'ml-auto bg-violet-600 text-white'
                        : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    <p
                      id={authorId}
                      className="mb-1 text-xs font-semibold uppercase tracking-wide text-inherit/80"
                    >
                      {authorLabel}
                    </p>
                    <p className="whitespace-pre-wrap">{getMessageDisplayText(message)}</p>
                  </div>
                </article>
              </li>
            )
          })}
          {isBusy && (
            <li>
              <p className="text-sm text-slate-400" role="status">
                Assistant is typing…
              </p>
            </li>
          )}
        </ul>
      </div>

      {chatError && (
        <p
          role="alert"
          className="mx-4 mb-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {chatError}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 p-4"
        aria-describedby="chat-description"
      >
        <label htmlFor="chat-input" className="mb-2 block text-sm font-medium text-slate-200">
          Your request
        </label>
        <textarea
          id="chat-input"
          name="message"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="What should change on the page?"
          rows={3}
          disabled={isBusy}
          aria-describedby="chat-input-hint"
          className="w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-base leading-relaxed text-white placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p id="chat-input-hint" className="mt-1 text-sm text-slate-400">
          {isBusy ? 'Wait for the assistant to finish before sending another message.' : 'Send when ready.'}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="submit"
            disabled={isBusy || !input.trim()}
            className="btn-editor-primary flex-1"
          >
            Send message
          </button>
          {isBusy && (
            <button type="button" onClick={stop} className="btn-editor-ghost">
              Stop response
            </button>
          )}
        </div>
      </form>

      <ProposalActions
        proposalError={proposalError}
        hasProposal={hasProposal}
        onApply={applyAction}
        onDiscard={discardAction}
      />
    </section>
  )
}
