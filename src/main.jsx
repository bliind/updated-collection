import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // bootstrap dark mode
  document.querySelector('html').setAttribute('data-bs-theme', 'dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
