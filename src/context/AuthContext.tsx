import { createContext, useState, type ReactNode } from 'react'
import type { Compte } from '../types/models'
import { COMPTES_INITIAUX } from '../data/donnees-initiales'
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from '../services/storage'

interface AuthContextValue {
  user: Compte | null
  comptes: Compte[]
  login: (compte: Compte) => void
  logout: () => void
  storageError: string | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// On ne stocke que l'id du compte, puis on retrouve le compte dans la liste.
function readSession() {
  const { data, error } = loadFromStorage<number>(STORAGE_KEYS.session)
  const user = COMPTES_INITIAUX.find((c) => c.id === data) ?? null
  return { user, error }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // La session est lue une seule fois, au démarrage : elle survit au rechargement.
  const [initial] = useState(readSession)
  const [user, setUser] = useState<Compte | null>(initial.user)
  const [storageError, setStorageError] = useState<string | null>(initial.error)

  function login(compte: Compte) {
    setUser(compte)
    setStorageError(saveToStorage(STORAGE_KEYS.session, compte.id))
  }

  function logout() {
    setUser(null)
    setStorageError(removeFromStorage(STORAGE_KEYS.session))
  }

  return (
    <AuthContext.Provider
      value={{ user, comptes: COMPTES_INITIAUX, login, logout, storageError }}
    >
      {children}
    </AuthContext.Provider>
  )
}