import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import RequireRole from './guards/RequireRole'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import CataloguePage from './pages/CataloguePage'
import MaterielDetailPage from './pages/MaterielDetailPage'
import MesReservationsPage from './pages/MesReservationsPage'
import AccesRefusePage from './pages/AccesRefusePage'
import NotFoundPage from './pages/NotFoundPage'

// Espace de gestion : chargé à la demande, seulement quand on y accède
const GestionPage = lazy(() => import('./pages/gestion/GestionPage'))
const NouveauMaterielPage = lazy(() => import('./pages/gestion/NouveauMaterielPage'))
const ModifierMaterielPage = lazy(() => import('./pages/gestion/ModifierMaterielPage'))

// Route "/" : redirection selon la session
function HomeRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? '/catalogue' : '/login'} replace />
}

export default function App() {
  return (
    <Suspense fallback={<p>Chargement…</p>}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Routes publiques */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/acces-refuse" element={<AccesRefusePage />} />

          {/* Tout utilisateur connecté */}
          <Route
            path="/catalogue"
            element={
              <RequireRole>
                <CataloguePage />
              </RequireRole>
            }
          />
          <Route
            path="/materiels/:id"
            element={
              <RequireRole>
                <MaterielDetailPage />
              </RequireRole>
            }
          />

          {/* Étudiant uniquement */}
          <Route
            path="/mes-reservations"
            element={
              <RequireRole roles={['student']}>
                <MesReservationsPage />
              </RequireRole>
            }
          />

          {/* Responsable uniquement */}
          <Route
            path="/gestion"
            element={
              <RequireRole roles={['manager']}>
                <GestionPage />
              </RequireRole>
            }
          />
          <Route
            path="/gestion/nouveau"
            element={
              <RequireRole roles={['manager']}>
                <NouveauMaterielPage />
              </RequireRole>
            }
          />
          <Route
            path="/gestion/:id/modifier"
            element={
              <RequireRole roles={['manager']}>
                <ModifierMaterielPage />
              </RequireRole>
            }
          />

          {/* Toute autre URL : 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}