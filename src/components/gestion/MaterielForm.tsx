import { useState, type FormEvent } from 'react'
import type { Equipement, EquipementFormValues } from '../../types/models'
import { CATEGORIES } from '../../data/donnees-initiales'
import { validateEquipement, hasErrors } from '../../utils/validation'
import type { EquipementFormErrors } from '../../utils/validation'
import Message from '../common/Message'

type EquipementValues = Omit<Equipement, 'id'>

interface MaterielFormProps {
  initialValues?: Equipement // absent = création, présent = modification
  submitLabel: string
  onSubmit: (values: EquipementValues) => void
  onCancel: () => void
}

const EMPTY: EquipementFormValues = {
  nom: '',
  categorie: '',
  description: '',
  localisation: '',
}

export default function MaterielForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: MaterielFormProps) {
  const [values, setValues] = useState<EquipementFormValues>(
    initialValues
      ? {
          nom: initialValues.nom,
          categorie: initialValues.categorie,
          description: initialValues.description,
          localisation: initialValues.localisation,
        }
      : EMPTY,
  )
  const [errors, setErrors] = useState<EquipementFormErrors>({})

  function handleChange(field: keyof EquipementFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // L'erreur du champ disparaît dès qu'on le corrige
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validateEquipement(values)
    setErrors(found)

    // Les valeurs saisies restent dans l'état : rien n'est perdu en cas d'erreur.
    const { categorie } = values
    if (hasErrors(found) || categorie === '') return

    onSubmit({
      nom: values.nom.trim(),
      categorie,
      description: values.description.trim(),
      localisation: values.localisation.trim(),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {hasErrors(errors) && (
        <Message variant="error">Veuillez corriger les champs signalés.</Message>
      )}

      <div className="field">
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          type="text"
          value={values.nom}
          aria-invalid={errors.nom !== undefined}
          aria-describedby={errors.nom ? 'nom-error' : undefined}
          onChange={(e) => handleChange('nom', e.target.value)}
        />
        {errors.nom && (
          <p id="nom-error" className="field-error">
            {errors.nom}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="categorie">Catégorie</label>
        <select
          id="categorie"
          value={values.categorie}
          aria-invalid={errors.categorie !== undefined}
          aria-describedby={errors.categorie ? 'categorie-error' : undefined}
          onChange={(e) => handleChange('categorie', e.target.value)}
        >
          <option value="">Choisir une catégorie</option>
          {CATEGORIES.map((categorie) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>
        {errors.categorie && (
          <p id="categorie-error" className="field-error">
            {errors.categorie}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          value={values.description}
          aria-invalid={errors.description !== undefined}
          aria-describedby={errors.description ? 'description-error' : undefined}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {errors.description && (
          <p id="description-error" className="field-error">
            {errors.description}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="localisation">Localisation</label>
        <input
          id="localisation"
          type="text"
          value={values.localisation}
          aria-invalid={errors.localisation !== undefined}
          aria-describedby={errors.localisation ? 'localisation-error' : undefined}
          onChange={(e) => handleChange('localisation', e.target.value)}
        />
        {errors.localisation && (
          <p id="localisation-error" className="field-error">
            {errors.localisation}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          {submitLabel}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  )
}