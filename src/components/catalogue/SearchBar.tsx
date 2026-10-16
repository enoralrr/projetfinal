interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="field">
      <label htmlFor="search">Rechercher par nom</label>
      <input
        id="search"
        type="search"
        value={value}
        placeholder="Ex. : ordinateur, micro…"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}