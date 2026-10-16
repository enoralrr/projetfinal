import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

export function useReservations() {
  const context = useContext(ReservationContext)
  if (context === null) {
    throw new Error(
      'useReservations doit être utilisé à l’intérieur de <ReservationProvider>',
    )
  }
  return context
}