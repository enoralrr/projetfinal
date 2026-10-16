import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCatalog } from '../hooks/useCatalog'
import { useReservations } from '../hooks/useReservations'
import ErrorBanner from '../components/common/ErrorBanner'

export default function MainLayout() {
  const { user, logout, storageError: authError } = useAuth()
  const { storageError: catalogError } = useCatalog()
  const { storageError: reservationError } = useReservations()
  const navigate = useNavigate()

  // Premier message d'erreur de stockage rencontré, s'il y en a un
  const storageError = authError ?? catalogError ?? reservationError

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">Campus Matériel</h1>

        {user && (
          <>
            <nav aria-label="Navigation principale">
              <NavLink to="/catalogue">Catalogue</NavLink>
              {user.role === 'student' && (
                <NavLink to="/mes-reservations">Mes réservations</NavLink>
              )}
              {user.role === 'manager' && <NavLink to="/gestion">Gestion</NavLink>}
            </nav>

            <div className="user-box">
              <span>{user.nom}</span>
              <button type="button" onClick={handleLogout}>
                Se déconnecter
              </button>
            </div>
          </>
        )}
      </header>

      <ErrorBanner message={storageError} />

      <main>
        <Outlet />
      </main>
    </>
  )
}