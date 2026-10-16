import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Role } from '../types/models'

const ROLE_LABELS: Record<Role, string> = {
  student: 'Étudiant',
  manager: 'Responsable',
}

export default function LoginPage() {
  const { comptes, user, login } = useAuth()
  const navigate = useNavigate()

  return (
    <section>
      <h2>Connexion</h2>
      <p>Choisissez un compte de démonstration (aucun mot de passe n’est demandé).</p>

      {user && (
        <p>
          Vous êtes connecté en tant que <strong>{user.nom}</strong>. Choisir un autre
          compte vous reconnecte.
        </p>
      )}

      <ul className="account-list">
        {comptes.map((compte) => (
          <li key={compte.id}>
            <button
              type="button"
              className="account-button"
              onClick={() => {
                login(compte)
                navigate('/catalogue')
              }}
            >
              <span>{compte.nom}</span>
              <small>{ROLE_LABELS[compte.role]}</small>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}