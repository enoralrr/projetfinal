# Campus Matériel

Application monopage (React, TypeScript, Vite, React Router) permettant aux étudiants de consulter et réserver du matériel, et à un responsable de gérer le catalogue.

## Installation et lancement

```
npm install
npm run dev
```

Puis ouvrir l'adresse affichée (généralement http://localhost:5173).
Autres commandes : `npm run build` (compilation), `npm run lint` (analyse du code).

## Comptes de démonstration

La connexion est simulée : on choisit un compte, sans mot de passe.

| Compte | Profil |
|---|---|
| Alice Martin | Étudiant |
| Yanis Bernard | Étudiant |
| Camille Dupont | Responsable |

## Routes

| Route | Contenu | Accès |
|---|---|---|
| `/login` | Choix du compte de démonstration | Public |
| `/catalogue` | Liste, recherche et filtre | Utilisateur connecté |
| `/materiels/:id` | Fiche détaillée et réservation | Utilisateur connecté (réservation réservée aux étudiants) |
| `/mes-reservations` | Réservations personnelles | Étudiant |
| `/gestion` | Gestion du catalogue | Responsable |
| `/gestion/nouveau` | Création d'un équipement | Responsable |
| `/gestion/:id/modifier` | Modification d'un équipement | Responsable |
| `/acces-refuse` | Explication d'un refus | Public |
| `/` | Redirection vers la connexion ou le catalogue | Selon la session |
| autre | Page 404 | Public |

## Organisation du code

- `src/pages` : une page par route (`pages/gestion` est chargé à la demande).
- `src/components` : composants réutilisables (catalogue, réservations, formulaire, messages).
- `src/context` et `src/hooks` : état partagé (session, catalogue, réservations) et hooks d'accès.
- `src/guards` : `RequireRole` protège les routes selon la session et le rôle.
- `src/services/storage.ts` : lecture et écriture du `localStorage` avec gestion des erreurs.
- `src/data` : jeu de données initial.

## Fonctionnalités réalisées

- Connexion simulée, session conservée au rechargement et supprimée à la déconnexion.
- Catalogue : recherche par nom (insensible aux accents), filtre par catégorie, indication de disponibilité, fiche détaillée, messages pour liste vide, recherche sans résultat et équipement inexistant.
- Réservation et annulation avec respect des règles métier : une seule réservation active par équipement, chaque étudiant ne voit et n'annule que ses propres réservations.
- Disponibilité calculée à partir des réservations actives (aucun champ « disponible » stocké).
- Gestion du catalogue : création, modification (même formulaire) et suppression avec confirmation. La suppression d'un équipement réservé est refusée avec explication.
- Validation du formulaire avec messages clairs et conservation de la saisie.
- Routes protégées (visiteur redirigé vers la connexion, mauvais rôle redirigé vers « accès refusé »), page 404, chargement différé de l'espace de gestion.
- Persistance du catalogue, des réservations et de la session dans `localStorage`, avec message en cas d'échec de lecture ou d'écriture.

## Trajet d'une réservation

1. Clic sur « Réserver » : le composant transmet la demande à sa page (`onReserve`).
2. La page appelle `reserve(equipementId, compte)` du contexte des réservations.
3. Contrôles : le compte est un étudiant et l'équipement est disponible (aucune réservation active).
4. L'état est mis à jour (nouvelle réservation ajoutée) puis sauvegardé dans `localStorage`.
5. Les composants qui utilisent le contexte se redessinent : badge, boutons et « Mes réservations » sont à jour sans rechargement.

## Limites connues

- Les données sont locales à un navigateur : aucune synchronisation entre ordinateurs ni entre onglets ouverts en même temps (un rechargement est nécessaire).
- Les contrôles d'accès sont faits uniquement dans le frontend ; dans une vraie application, le serveur les vérifierait aussi.
- Pas de dates de réservation : le matériel reste réservé jusqu'à l'annulation.
- Pas d'images, pas de tests automatisés.
- Extensions facultatives non réalisées : filtre conservé dans l'URL, retour à la page demandée après connexion, compteur par catégorie, réinitialisation des données de démonstration.