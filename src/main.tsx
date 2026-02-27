import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LogoOnlyPage } from './pages/LogoOnlyPage.tsx'

const isLogoOnly = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('logo-only')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLogoOnly ? <LogoOnlyPage /> : <App />}
  </StrictMode>,
)
