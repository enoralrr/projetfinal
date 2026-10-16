import type { Equipement, Categorie } from '../data/donnees-initiales'

// Réexport des types du jeu de données : tout le projet les importe d'ici.
export type {
  Role,
  Categorie,
  Compte,
  Equipement,
  Reservation,
} from '../data/donnees-initiales'

// Valeurs du formulaire : une fiche sans id (généré à la création),
// avec une catégorie qui peut être vide tant que rien n'est choisi.
export type EquipementFormValues = Omit<Equipement, 'id' | 'categorie'> & {
  categorie: Categorie | ''
}