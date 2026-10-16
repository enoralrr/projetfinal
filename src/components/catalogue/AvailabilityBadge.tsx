interface AvailabilityBadgeProps {
  available: boolean
}

export default function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  return (
    <span className={available ? 'badge badge-ok' : 'badge badge-off'}>
      {available ? 'Disponible' : 'Réservé'}
    </span>
  )
}