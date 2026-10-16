import type { Equipement } from '../../types/models'
import MaterielCard from './MaterielCard'
import Message from '../common/Message'

interface MaterielListProps {
  equipements: Equipement[]
  isAvailable: (equipementId: number) => boolean
  canReserve: boolean
  onReserve: (equipementId: number) => void
}

export default function MaterielList({
  equipements,
  isAvailable,
  canReserve,
  onReserve,
}: MaterielListProps) {
  if (equipements.length === 0) {
    return (
      <Message>
        Aucun équipement ne correspond à votre recherche. Modifiez le nom ou la
        catégorie.
      </Message>
    )
  }

  return (
    <div className="card-grid">
      {equipements.map((equipement) => (
        <MaterielCard
          key={equipement.id}
          equipement={equipement}
          available={isAvailable(equipement.id)}
          canReserve={canReserve}
          onReserve={onReserve}
        />
      ))}
    </div>
  )
}