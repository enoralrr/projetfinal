import { useContext } from 'react'
import { CatalogContext } from '../context/CatalogContext'

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (context === null) {
    throw new Error('useCatalog doit être utilisé à l’intérieur de <CatalogProvider>')
  }
  return context
}