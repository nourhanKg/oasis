import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ErrorBoundary} from 'react-error-boundary'
import '../src/styles/index.css'
import GlobalStyles from './styles/GlobalStyles.js'
import App from './App.jsx'
import ErrorFallback from './components/ErrorFallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provide global styles */}
    <GlobalStyles/>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
