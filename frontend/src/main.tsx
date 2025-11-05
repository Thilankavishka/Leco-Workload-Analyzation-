import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { BlockProvider } from './contexts/block-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BlockProvider>
        <App />
      </BlockProvider>
    </BrowserRouter>
  </StrictMode>,
)
