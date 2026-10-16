import { Link } from 'react-router-dom'

export default function AccesRefusePage() {
  return (
    <section>
      <h2>Accès refusé</h2>
      <p role="alert">
        Votre profil ne vous permet pas d’accéder à cette page.
      </p>
      <Link to="/catalogue">Retour au catalogue</Link>
    </section>
  )
}