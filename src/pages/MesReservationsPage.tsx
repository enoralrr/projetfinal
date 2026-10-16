import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCatalog } from '../hooks/useCatalog'
import { useReservations } from '../hooks/useReservations'
import ReservationItem from '../components/reservations/ReservationItem'
import Message from '../components/common/Message'

type Feedback = { variant: 'success' | 'error'; text: string }

export default function MesReservationsPage() {
  const { user } = useAuth()
  const { getEquipement } = useCatalog()
  const { reservationsOf, cancel } = useReservations()
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  // Ne devrait pas arriver : la route est protégée par RequireRole.
  if (user === null) return null

  // Uniquement les réservations de l'étudiant connecté
  const mesReservations = reservationsOf(user.id)

  function handleCancel(reservationId: string) {
    if (user === null) return
    const result = cancel(reservationId, user)
    setFeedback(
      result.ok
        ? {
            variant: 'success',
            text: 'Réservation annulée : l’équipement est de nouveau disponible.',
          }
        : { variant: 'error', text: result.message },
    )
  }

  return (
    <section>
      <h2>Mes réservations</h2>

      {feedback && <Message variant={feedback.variant}>{feedback.text}</Message>}

      {mesReservations.length === 0 ? (
        <Message>
          Vous n’avez aucune réservation. <Link to="/catalogue">Parcourir le catalogue</Link>
        </Message>
      ) : (
        <ul className="reservation-list">
          {mesReservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              equipement={getEquipement(reservation.equipementId)}
              onCancel={handleCancel}
            />
          ))}
        </ul>
      )}
    </section>
  )
}