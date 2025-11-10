import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import GlobalStyles from './styles/GlobalStyles.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provide global styles */}
    <GlobalStyles/>
    <App />
  </StrictMode>,
)
