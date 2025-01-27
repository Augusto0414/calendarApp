import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import CalendarApp from './CalendarApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>,
)
