import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CatalogProvider } from './context/CatalogContext'
import { ReservationProvider } from './context/ReservationContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CatalogProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </CatalogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)