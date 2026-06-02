type ProposalActionsProps = {
  proposalError: string | null
  hasProposal: boolean
  onApply: () => void
  onDiscard: () => void
}

export function ProposalActions({
  proposalError,
  hasProposal,
  onApply,
  onDiscard,
}: ProposalActionsProps) {
  if (!proposalError && !hasProposal) {
    return null
  }

  return (
    <section
      aria-labelledby="proposal-actions-heading"
      className="border-t border-white/10 bg-slate-900 p-4"
    >
      <h2 id="proposal-actions-heading" className="sr-only">
        Proposed page changes
      </h2>

      {proposalError && (
        <p
          role="alert"
          className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {proposalError}
        </p>
      )}

      {hasProposal && (
        <div className="flex gap-2" role="group" aria-label="Apply or discard proposed changes">
          <button type="button" onClick={onApply} className="btn-editor-success flex-1">
            Apply changes
          </button>
          <button type="button" onClick={onDiscard} className="btn-editor-ghost flex-1">
            Discard proposal
          </button>
        </div>
      )}
    </section>
  )
}
