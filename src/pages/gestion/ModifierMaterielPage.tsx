import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCatalog } from '../../hooks/useCatalog'
import MaterielForm from '../../components/gestion/MaterielForm'
import Message from '../../components/common/Message'

export default function ModifierMaterielPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEquipement, updateEquipement } = useCatalog()

  const equipement =
    id !== undefined && /^\d+$/.test(id) ? getEquipement(Number(id)) : undefined

  if (equipement === undefined) {
    return (
      <section>
        <h2>Modifier un équipement</h2>
        <Message variant="error">Cet équipement n’existe pas.</Message>
        <Link to="/gestion">Retour à la gestion</Link>
      </section>
    )
  }

  return (
    <section>
      <h2>Modifier « {equipement.nom} »</h2>
      {/* key : le formulaire repart d'un état neuf si l'équipement change */}
      <MaterielForm
        key={equipement.id}
        initialValues={equipement}
        submitLabel="Enregistrer les modifications"
        onSubmit={(values) => {
          updateEquipement(equipement.id, values)
          navigate('/gestion')
        }}
        onCancel={() => navigate('/gestion')}
      />
    </section>
  )
}