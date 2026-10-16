import type { Categorie } from '../../types/models'

interface CategoryFilterProps {
  categories: Categorie[]
  value: Categorie | ''
  onChange: (value: Categorie | '') => void
}

export default function CategoryFilter({
  categories,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="field">
      <label htmlFor="category">Catégorie</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value as Categorie | '')}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((categorie) => (
          <option key={categorie} value={categorie}>
            {categorie}
          </option>
        ))}
      </select>
    </div>
  )
}