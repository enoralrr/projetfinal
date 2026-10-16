import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCatalog } from '../hooks/useCatalog'
import { useReservations } from '../hooks/useReservations'
import AvailabilityBadge from '../components/catalogue/AvailabilityBadge'
import Message from '../components/common/Message'

type Feedback = { variant: 'success' | 'error'; text: string }

export default function MaterielDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { getEquipement } = useCatalog()
  const { reservations, isAvailable, reserve } = useReservations()
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  // "abc" ou "12x" ne sont pas des identifiants valides
  const equipement =
    id !== undefined && /^\d+$/.test(id) ? getEquipement(Number(id)) : undefined

  if (equipement === undefined) {
    return (
      <section>
        <h2>Fiche matériel</h2>
        <Message variant="error">Cet équipement n’existe pas.</Message>
        <Link to="/catalogue">Retour au catalogue</Link>
      </section>
    )
  }

  const available = isAvailable(equipement.id)
  const isStudent = user?.role === 'student'
  const reservedByMe =
    user !== null &&
    reservations.some(
      (r) => r.equipementId === equipement.id && r.etudiantId === user.id,
    )

  function handleReserve() {
    if (user === null || equipement === undefined) return
    const result = reserve(equipement.id, user)
    setFeedback(
      result.ok
        ? { variant: 'success', text: 'Équipement réservé avec succès.' }
        : { variant: 'error', text: result.message },
    )
  }

  return (
    <section>
      <p>
        <Link to="/catalogue">← Retour au catalogue</Link>
      </p>

      <article className="card detail">
        <div className="card-head">
          <h2>{equipement.nom}</h2>
          <AvailabilityBadge available={available} />
        </div>

        <dl className="detail-list">
          <dt>Catégorie</dt>
          <dd>{equipement.categorie}</dd>
          <dt>Description</dt>
          <dd>{equipement.description}</dd>
          <dt>Localisation</dt>
          <dd>{equipement.localisation}</dd>
        </dl>

        {feedback && <Message variant={feedback.variant}>{feedback.text}</Message>}

        {isStudent && reservedByMe && (
          <Message variant="success">
            Vous avez réservé cet équipement.{' '}
            <Link to="/mes-reservations">Voir mes réservations</Link>
          </Message>
        )}

        {isStudent && !reservedByMe && !available && (
          <Message>Cet équipement est déjà réservé par un autre étudiant.</Message>
        )}

        {isStudent && available && (
          <button type="button" className="btn" onClick={handleReserve}>
            Réserver cet équipement
          </button>
        )}

        {!isStudent && (
          <Message>
            Seuls les étudiants peuvent réserver. Les responsables gèrent le
            catalogue depuis l’espace Gestion.
          </Message>
        )}
      </article>
    </section>
  )
}