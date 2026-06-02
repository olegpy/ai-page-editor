import { useReducer } from 'react'
import { defaultLandingContent, type LandingPageContent } from '../landing'

type PageEditorState = {
  pageContent: LandingPageContent
  proposal: LandingPageContent | null
  proposalError: string | null
}

type EditorAction =
  | { type: 'proposal'; content: LandingPageContent | null; error: string | null }
  | { type: 'apply' }
  | { type: 'discard' }

const initialState: PageEditorState = {
  pageContent: defaultLandingContent,
  proposal: null,
  proposalError: null,
}

function pageEditorReducer(state: PageEditorState, action: EditorAction): PageEditorState {
  switch (action.type) {
    case 'proposal':
      return {
        ...state,
        proposal: action.content,
        proposalError: action.error,
      }
    case 'apply':
      if (!state.proposal) return state
      return {
        pageContent: state.proposal,
        proposal: null,
        proposalError: null,
      }
    case 'discard':
      return {
        ...state,
        proposal: null,
        proposalError: null,
      }
  }
}

export type PageEditor = ReturnType<typeof usePageEditor>

export function usePageEditor() {
  const [state, dispatch] = useReducer(pageEditorReducer, initialState)

  return {
    pageContent: state.pageContent,
    previewContent: state.proposal ?? state.pageContent,
    hasProposal: state.proposal !== null,
    proposalError: state.proposalError,
    setProposal: (content: LandingPageContent | null, error: string | null) => {
      dispatch({ type: 'proposal', content, error })
    },
    applyAction: () => {
      dispatch({ type: 'apply' })
    },
    discardAction: () => {
      dispatch({ type: 'discard' })
    },
  }
}
