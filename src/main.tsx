import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProvider } from './store/app'
import { SessionProvider } from './store/session'
import { registerServiceWorker } from './lib/pwa'
import './index.css'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </AppProvider>
  </StrictMode>,
)
