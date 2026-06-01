import { defaultLandingContent } from './landing/defaultContent'
import { LandingPage } from './landing/LandingPage'

function App() {
  const pageContent = defaultLandingContent

  return <LandingPage content={pageContent} />
}

export default App
