import { LandingPage, type LandingPageContent } from '../landing'

type PagePreviewProps = {
  content: LandingPageContent
  isProposal: boolean
}

export function PagePreview({ content, isProposal }: PagePreviewProps) {
  return (
    <section
      id="page-preview"
      aria-labelledby="preview-heading"
      className="relative flex h-full min-h-0 flex-col bg-slate-950"
    >
      <h2 id="preview-heading" className="sr-only">
        Page preview
      </h2>

      {isProposal && (
        <p
          role="status"
          aria-live="polite"
          className="absolute left-0 right-0 top-0 z-20 border-b border-amber-500/30 bg-amber-500/15 px-4 py-2.5 text-center text-sm font-medium text-amber-100"
        >
          Previewing proposed changes. Apply or discard in the chat panel.
        </p>
      )}

      <div
        tabIndex={-1}
        className={
          isProposal
            ? 'flex-1 overflow-y-auto pt-12 ring-2 ring-inset ring-amber-500/40 focus:outline-none'
            : 'flex-1 overflow-y-auto focus:outline-none'
        }
      >
        <LandingPage content={content} />
      </div>
    </section>
  )
}
