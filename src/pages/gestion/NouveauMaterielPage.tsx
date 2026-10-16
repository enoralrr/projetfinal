import { useNavigate } from 'react-router-dom'
import { useCatalog } from '../../hooks/useCatalog'
import MaterielForm from '../../components/gestion/MaterielForm'

export default function NouveauMaterielPage() {
  const navigate = useNavigate()
  const { addEquipement } = useCatalog()

  return (
    <section>
      <h2>Nouvel équipement</h2>
      <MaterielForm
        submitLabel="Créer l’équipement"
        onSubmit={(values) => {
          addEquipement(values)
          navigate('/gestion')
        }}
        onCancel={() => navigate('/gestion')}
      />
    </section>
  )
}