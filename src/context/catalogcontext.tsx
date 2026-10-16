import { createContext, useState, type ReactNode } from 'react'
import type { Equipement } from '../types/models'
import { EQUIPEMENTS_INITIAUX } from '../data/donnees-initiales'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '../services/storage'

// Les valeurs d'une fiche, sans l'id (généré à la création)
type EquipementValues = Omit<Equipement, 'id'>

interface CatalogContextValue {
  equipements: Equipement[]
  getEquipement: (id: number) => Equipement | undefined
  addEquipement: (values: EquipementValues) => void
  updateEquipement: (id: number, values: EquipementValues) => void
  deleteEquipement: (id: number) => void
  storageError: string | null
}

export const CatalogContext = createContext<CatalogContextValue | null>(null)

function readCatalog() {
  const { data, error } = loadFromStorage<Equipement[]>(STORAGE_KEYS.catalog)
  // Le jeu initial n'est chargé que s'il n'y a RIEN d'enregistré.
  // Un tableau vide enregistré est une donnée valide : on le garde.
  const equipements = Array.isArray(data)
    ? data
    : structuredClone(EQUIPEMENTS_INITIAUX)
  return { equipements, error }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(readCatalog)
  const [equipements, setEquipements] = useState<Equipement[]>(initial.equipements)
  const [storageError, setStorageError] = useState<string | null>(initial.error)

  // Met à jour l'état ET sauvegarde, toujours ensemble.
  function commit(next: Equipement[]) {
    setEquipements(next)
    setStorageError(saveToStorage(STORAGE_KEYS.catalog, next))
  }

  function getEquipement(id: number) {
    return equipements.find((e) => e.id === id)
  }

  function addEquipement(values: EquipementValues) {
    // Date.now() : identifiant unique et jamais réutilisé (pas length + 1)
    commit([...equipements, { id: Date.now(), ...values }])
  }

  function updateEquipement(id: number, values: EquipementValues) {
    commit(equipements.map((e) => (e.id === id ? { ...e, ...values } : e)))
  }

  // Attention : ce contexte ne connaît pas les réservations.
  // C'est GestionPage qui refuse la suppression d'un équipement réservé
  // (avec useReservations) avant d'appeler cette fonction.
  function deleteEquipement(id: number) {
    commit(equipements.filter((e) => e.id !== id))
  }

  return (
    <CatalogContext.Provider
      value={{
        equipements,
        getEquipement,
        addEquipement,
        updateEquipement,
        deleteEquipement,
        storageError,
      }}
    >
      {children}
    </CatalogContext.Provider>
  )
}