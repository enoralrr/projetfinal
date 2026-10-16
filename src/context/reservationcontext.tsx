import { createContext, useState, type ReactNode } from 'react'
import type { Compte, Reservation } from '../types/models'
import { RESERVATIONS_INITIALES } from '../data/donnees-initiales'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../services/storage'

// Résultat d'une action : réussite, ou échec avec un message à afficher
export type ActionResult = { ok: true } | { ok: false; message: string }

interface ReservationContextValue {
  reservations: Reservation[]
  isAvailable: (equipementId: number) => boolean
  reservationsOf: (etudiantId: number) => Reservation[]
  reserve: (equipementId: number, compte: Compte) => ActionResult
  cancel: (reservationId: string, compte: Compte) => ActionResult
  storageError: string | null
}

export const ReservationContext = createContext<ReservationContextValue | null>(null)

function readReservations() {
  const { data, error } = loadFromStorage<Reservation[]>(STORAGE_KEYS.reservations)
  const reservations = Array.isArray(data)
    ? data
    : structuredClone(RESERVATIONS_INITIALES)
  return { reservations, error }
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(readReservations)
  const [reservations, setReservations] = useState<Reservation[]>(initial.reservations)
  const [storageError, setStorageError] = useState<string | null>(initial.error)

  function commit(next: Reservation[]) {
    setReservations(next)
    setStorageError(saveToStorage(STORAGE_KEYS.reservations, next))
  }

  // La disponibilité est CALCULÉE : disponible = aucune réservation active.
  function isAvailable(equipementId: number) {
    return !reservations.some((r) => r.equipementId === equipementId)
  }

  function reservationsOf(etudiantId: number) {
    return reservations.filter((r) => r.etudiantId === etudiantId)
  }

  function reserve(equipementId: number, compte: Compte): ActionResult {
    if (compte.role !== 'student') {
      return { ok: false, message: 'Seuls les étudiants peuvent réserver du matériel.' }
    }
    if (!isAvailable(equipementId)) {
      return { ok: false, message: 'Cet équipement est déjà réservé.' }
    }
    commit([
      ...reservations,
      { id: crypto.randomUUID(), equipementId, etudiantId: compte.id },
    ])
    return { ok: true }
  }

  function cancel(reservationId: string, compte: Compte): ActionResult {
    const target = reservations.find((r) => r.id === reservationId)
    if (!target) {
      return { ok: false, message: "Cette réservation n'existe pas ou est déjà annulée." }
    }
    if (target.etudiantId !== compte.id) {
      return { ok: false, message: 'Vous ne pouvez annuler que vos propres réservations.' }
    }
    // Annuler = retirer la réservation : l'équipement redevient disponible tout seul.
    commit(reservations.filter((r) => r.id !== reservationId))
    return { ok: true }
  }

  return (
    <ReservationContext.Provider
      value={{ reservations, isAvailable, reservationsOf, reserve, cancel, storageError }}
    >
      {children}
    </ReservationContext.Provider>
  )
}