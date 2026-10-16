import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section>
      <h2>Page introuvable (404)</h2>
      <p>L’adresse demandée n’existe pas.</p>
      <Link to="/">Retour à l’accueil</Link>
    </section>
  )
}