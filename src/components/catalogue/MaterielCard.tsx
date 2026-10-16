import { Link } from 'react-router-dom'
import type { Equipement } from '../../types/models'
import AvailabilityBadge from './AvailabilityBadge'

interface MaterielCardProps {
  equipement: Equipement
  available: boolean
  canReserve: boolean
  onReserve: (equipementId: number) => void
}

export default function MaterielCard({
  equipement,
  available,
  canReserve,
  onReserve,
}: MaterielCardProps) {
  return (
    <article className="card">
      <div className="card-head">
        <h3>{equipement.nom}</h3>
        <AvailabilityBadge available={available} />
      </div>
      <p className="card-category">{equipement.categorie}</p>
      <p>{equipement.description}</p>
      <p className="card-location">Localisation : {equipement.localisation}</p>

      <div className="card-actions">
        <Link
          to={`/materiels/${equipement.id}`}
          className="btn btn-secondary"
          aria-label={`Voir la fiche de ${equipement.nom}`}
        >
          Voir la fiche
        </Link>

        {canReserve && (
          <button
            type="button"
            className="btn"
            disabled={!available}
            // La carte ne réserve pas elle-même : elle transmet la demande à son parent.
            onClick={() => onReserve(equipement.id)}
          >
            {available ? 'Réserver' : 'Indisponible'}
          </button>
        )}
      </div>
    </article>
  )
}