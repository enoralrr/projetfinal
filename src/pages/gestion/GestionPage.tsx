import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Equipement } from '../../types/models'
import { useCatalog } from '../../hooks/useCatalog'
import { useReservations } from '../../hooks/useReservations'
import ConfirmDialog from '../../components/gestion/ConfirmDialog'
import AvailabilityBadge from '../../components/catalogue/AvailabilityBadge'
import Message from '../../components/common/Message'

type Feedback = { variant: 'success' | 'error'; text: string }

export default function GestionPage() {
  const { equipements, deleteEquipement } = useCatalog()
  const { isAvailable } = useReservations()
  const [pending, setPending] = useState<Equipement | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  function refusal(equipement: Equipement): Feedback {
    return {
      variant: 'error',
      text: `Suppression impossible : « ${equipement.nom} » est actuellement réservé. Il pourra être supprimé une fois la réservation annulée.`,
    }
  }

  function handleDeleteClick(equipement: Equipement) {
    // Un équipement réservé ne peut pas être supprimé : on explique le refus.
    if (!isAvailable(equipement.id)) {
      setFeedback(refusal(equipement))
      return
    }
    setFeedback(null)
    setPending(equipement) // ouvre la demande de confirmation
  }

  function handleConfirm() {
    if (pending === null) return
    // Nouveau contrôle au moment de confirmer, au cas où l'état aurait changé
    if (!isAvailable(pending.id)) {
      setFeedback(refusal(pending))
      setPending(null)
      return
    }
    deleteEquipement(pending.id)
    setFeedback({ variant: 'success', text: `« ${pending.nom} » a été supprimé.` })
    setPending(null)
  }

  return (
    <section>
      <div className="page-head">
        <h2>Gestion du catalogue</h2>
        <Link to="/gestion/nouveau" className="btn">
          Ajouter un équipement
        </Link>
      </div>

      {feedback && <Message variant={feedback.variant}>{feedback.text}</Message>}

      {equipements.length === 0 ? (
        <Message>Le catalogue est vide. Ajoutez une première fiche.</Message>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Localisation</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipements.map((equipement) => (
                <tr key={equipement.id}>
                  <td>{equipement.nom}</td>
                  <td>{equipement.categorie}</td>
                  <td>{equipement.localisation}</td>
                  <td>
                    <AvailabilityBadge available={isAvailable(equipement.id)} />
                  </td>
                  <td>
                    <div className="card-actions">
                      <Link
                        to={`/gestion/${equipement.id}/modifier`}
                        className="btn btn-secondary"
                        aria-label={`Modifier ${equipement.nom}`}
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        aria-label={`Supprimer ${equipement.nom}`}
                        onClick={() => handleDeleteClick(equipement)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pending && (
        <ConfirmDialog
          title="Supprimer cet équipement ?"
          message={`« ${pending.nom} » sera définitivement retiré du catalogue.`}
          confirmLabel="Supprimer"
          onConfirm={handleConfirm}
          onCancel={() => setPending(null)}
        />
      )}
    </section>
  )
}