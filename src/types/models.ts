export type Role = 'etudiant' | 'responsable'
export interface User { id: string; nom: string; role: Role }
export interface Materiel {
  id: number; nom: string; categorie: string; description: string; localisation: string
}
export type MaterielFormValues = Omit<Materiel, 'id'>
export interface Reservation { id: string; materielId: number; userId: string }