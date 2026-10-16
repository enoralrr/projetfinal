import { useMemo, useState } from 'react'
import type { Categorie } from '../types/models'
import { CATEGORIES } from '../data/donnees-initiales'
import { useAuth } from '../hooks/useAuth'
import { useCatalog } from '../hooks/useCatalog'
import { useReservations } from '../hooks/useReservations'
import SearchBar from '../components/catalogue/SearchBar'
import CategoryFilter from '../components/catalogue/CategoryFilter'
import MaterielList from '../components/catalogue/MaterielList'
import Message from '../components/common/Message'

// Minuscules et sans accents : "video" retrouve "Vidéoprojecteur"
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

type Feedback = { variant: 'success' | 'error'; text: string }

export default function CataloguePage() {
  const { user } = useAuth()
  const { equipements } = useCatalog()
  const { isAvailable, reserve } = useReservations()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Categorie | ''>('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const filtered = useMemo(() => {
    const query = normalize(search.trim())
    return equipements.filter(
      (e) =>
        normalize(e.nom).includes(query) &&
        (category === '' || e.categorie === category),
    )
  }, [equipements, search, category])

  // Appelée par une carte (via MaterielList) quand on clique sur « Réserver »
  function handleReserve(equipementId: number) {
    if (user === null) return
    const result = reserve(equipementId, user)
    const nom = equipements.find((e) => e.id === equipementId)?.nom ?? 'Équipement'
    setFeedback(
      result.ok
        ? {
            variant: 'success',
            text: `« ${nom} » est réservé. Retrouvez-le dans « Mes réservations ».`,
          }
        : { variant: 'error', text: result.message },
    )
  }

  return (
    <section>
      <h2>Catalogue</h2>

      {equipements.length === 0 ? (
        <Message>Le catalogue est vide pour le moment.</Message>
      ) : (
        <>
          <div className="toolbar">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter
              categories={CATEGORIES}
              value={category}
              onChange={setCategory}
            />
          </div>

          <p className="result-count" aria-live="polite">
            {filtered.length} équipement{filtered.length > 1 ? 's' : ''} affiché
            {filtered.length > 1 ? 's' : ''}
          </p>

          {feedback && <Message variant={feedback.variant}>{feedback.text}</Message>}

          <MaterielList
            equipements={filtered}
            isAvailable={isAvailable}
            canReserve={user?.role === 'student'}
            onReserve={handleReserve}
          />
        </>
      )}
    </section>
  )
}