// Clés du localStorage, centralisées pour éviter les fautes de frappe
export const STORAGE_KEYS = {
  session: 'campus.session',
  catalog: 'campus.catalog',
  reservations: 'campus.reservations',
} as const

export interface LoadResult<T> {
  data: T | null // null = rien d'enregistré (ou lecture impossible)
  error: string | null // message affichable si la lecture a échoué
}

export function loadFromStorage<T>(key: string): LoadResult<T> {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return { data: null, error: null }
    return { data: JSON.parse(raw) as T, error: null }
  } catch {
    return {
      data: null,
      error: 'Impossible de lire les données enregistrées sur cet appareil.',
    }
  }
}

// Renvoie un message d'erreur, ou null si tout s'est bien passé
export function saveToStorage(key: string, value: unknown): string | null {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return null
  } catch {
    return "Impossible d'enregistrer les données sur cet appareil."
  }
}

export function removeFromStorage(key: string): string | null {
  try {
    localStorage.removeItem(key)
    return null
  } catch {
    return 'Impossible de supprimer les données enregistrées.'
  }
}