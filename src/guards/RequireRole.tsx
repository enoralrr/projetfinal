import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types/models'

interface RequireRoleProps {
  roles?: Role[] // si absent : tout utilisateur connecté est accepté
  children: ReactNode
}

export default function RequireRole({ roles, children }: RequireRoleProps) {
  const { user } = useAuth()
  const location = useLocation()

  // Visiteur non connecté : retour à la connexion
  if (user === null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Connecté, mais pas le bon rôle : accès refusé
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/acces-refuse" replace />
  }

  return <>{children}</>
}