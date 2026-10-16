import type { EquipementFormValues } from '../types/models'

export type EquipementFormErrors = Partial<
  Record<keyof EquipementFormValues, string>
>

export function validateEquipement(
  values: EquipementFormValues,
): EquipementFormErrors {
  const errors: EquipementFormErrors = {}

  if (values.nom.trim().length < 3) {
    errors.nom = 'Le nom est obligatoire et doit contenir au moins 3 caractères.'
  }
  if (values.categorie === '') {
    errors.categorie = 'La catégorie est obligatoire.'
  }
  if (values.description.trim().length < 10) {
    errors.description =
      'La description est obligatoire et doit contenir au moins 10 caractères.'
  }
  if (values.localisation.trim() === '') {
    errors.localisation = 'La localisation est obligatoire.'
  }

  return errors
}

export function hasErrors(errors: EquipementFormErrors): boolean {
  return Object.keys(errors).length > 0
}