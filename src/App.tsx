import { ChatPanel, PagePreview } from './editor'
import { usePageEditor } from './hooks'

function App() {
  const editor = usePageEditor()

  return (
    <div className="flex h-screen min-h-0 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(320px,40%)_1fr]">
        <ChatPanel editor={editor} />
        <PagePreview content={editor.previewContent} isProposal={editor.hasProposal} />
      </div>
    </div>
  )
}

export default App
