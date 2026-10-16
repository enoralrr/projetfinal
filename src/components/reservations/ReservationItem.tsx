import { Link } from 'react-router-dom'
import type { Equipement, Reservation } from '../../types/models'

interface ReservationItemProps {
  reservation: Reservation
  equipement: Equipement | undefined
  onCancel: (reservationId: string) => void
}

export default function ReservationItem({
  reservation,
  equipement,
  onCancel,
}: ReservationItemProps) {
  // Cas peu probable (la suppression d'un équipement réservé est refusée),
  // mais on évite de planter si les données enregistrées sont incohérentes.
  const nom = equipement?.nom ?? 'Équipement supprimé'

  return (
    <li className="card reservation-item">
      <div>
        <h3>{nom}</h3>
        {equipement && (
          <>
            <p className="card-category">{equipement.categorie}</p>
            <p className="card-location">Localisation : {equipement.localisation}</p>
          </>
        )}
      </div>

      <div className="card-actions">
        {equipement && (
          <Link
            to={`/materiels/${equipement.id}`}
            className="btn btn-secondary"
            aria-label={`Voir la fiche de ${nom}`}
          >
            Voir la fiche
          </Link>
        )}
        <button
          type="button"
          className="btn btn-danger"
          aria-label={`Annuler la réservation de ${nom}`}
          onClick={() => onCancel(reservation.id)}
        >
          Annuler
        </button>
      </div>
    </li>
  )
}