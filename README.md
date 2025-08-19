# Courrier Plus - Frontend

Une application frontend moderne et sécurisée construite avec Next.js 15 et un stack technologique de pointe.

## 🚀 Stack Technologique

### Frameworks et Librairies Principales

#### **Next.js 15**
- **Qu'est-ce que c'est ?** Framework React fullstack avec support du Server-Side Rendering (SSR) et Static Site Generation (SSG)
- **À quoi ça sert ?** Optimiser les performances, SEO et expérience développeur
- **Avantages :**
  - Rendu côté serveur pour de meilleures performances
  - Routing automatique basé sur les fichiers
  - Optimisation des images et des bundles
  - App Router avec React 18+ features

#### **TypeScript**
- **Qu'est-ce que c'est ?** Superset de JavaScript avec typage statique
- **À quoi ça sert ?** Prévenir les erreurs et améliorer la maintenance du code
- **Avantages :**
  - Détection d'erreurs à la compilation
  - IntelliSense amélioré
  - Refactoring plus sûr
  - Documentation vivante du code

#### **Shadcn/ui**
- **Qu'est-ce que c'est ?** Système de composants basé sur Radix UI et Tailwind CSS
- **À quoi ça sert ?** Fournir des composants UI accessibles et personnalisables
- **Avantages :**
  - Composants accessibles (ARIA)
  - Personnalisation complète
  - Dark mode intégré
  - TypeScript natif

### Gestion des Données

#### **TanStack Query (React Query)**
- **Qu'est-ce que c'est ?** Librairie de gestion d'état serveur pour React
- **À quoi ça sert ?** Gérer les données asynchrones, cache et synchronisation
- **Avantages :**
  - Cache intelligent automatique
  - Mise à jour en arrière-plan
  - Gestion des états de chargement
  - Optimistic updates

#### **Axios**
- **Qu'est-ce que c'est ?** Client HTTP basé sur les Promises
- **À quoi ça sert ?** Effectuer des requêtes API avec intercepteurs
- **Avantages :**
  - Intercepteurs de requête/réponse
  - Gestion automatique des timeouts
  - Transformation des données
  - Protection CSRF

#### **Zustand**
- **Qu'est-ce que c'est ?** Librairie de gestion d'état global légère
- **À quoi ça sert ?** Gérer l'état global de l'application (auth, UI)
- **Avantages :**
  - API simple et minimaliste
  - TypeScript natif
  - Pas de providers/wrappers
  - Persistance intégrée

### Formulaires et Validation

#### **React Hook Form**
- **Qu'est-ce que c'est ?** Librairie de gestion de formulaires performante
- **À quoi ça sert ?** Créer des formulaires avec validation minimale de re-renders
- **Avantages :**
  - Performances optimales
  - Validation intégrée
  - API intuitive
  - Bundle size réduit

#### **Zod**
- **Qu'est-ce que c'est ?** Librairie de validation de schémas TypeScript-first
- **À quoi ça sert ?** Valider et typer les données côté client et serveur
- **Avantages :**
  - Type inference automatique
  - Messages d'erreur personnalisables
  - Composition de schémas
  - Runtime validation

### Authentification et Sécurité

#### **NextAuth.js**
- **Qu'est-ce que c'est ?** Solution d'authentification complète pour Next.js
- **À quoi ça sert ?** Gérer l'authentification avec différents providers
- **Avantages :**
  - Intégration native Next.js
  - Multiples providers (OAuth, Email, etc.)
  - Sécurité intégrée (CSRF, JWT)
  - Session management

#### **js-cookie**
- **Qu'est-ce que c'est ?** API simple pour manipuler les cookies
- **À quoi ça sert ?** Gérer les cookies de manière sécurisée
- **Avantages :**
  - API simple et légère
  - Support des attributs de sécurité
  - Cross-browser compatibility
  - TypeScript support

## 🛡️ Sécurité OWASP

### Mesures de Sécurité Implémentées

1. **Headers de Sécurité**
   - Content Security Policy (CSP)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security

2. **Protection XSS**
   - Sanitisation HTML avec DOMPurify
   - Validation des entrées utilisateur
   - Échappement automatique des données

3. **Protection CSRF**
   - Tokens CSRF automatiques
   - SameSite cookies
   - Origin validation

4. **Authentification Sécurisée**
   - Validation de mot de passe robuste
   - Session management sécurisé
   - Rate limiting

## 📁 Structure du Projet

```
src/
├── app/                 # App Router (Next.js 13+)
├── components/          # Composants réutilisables
│   ├── auth/           # Composants d'authentification
│   ├── providers/      # Context providers
│   └── ui/             # Composants UI de base
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires et configurations
├── services/           # Services API
├── stores/             # Stores Zustand
├── types/              # Types TypeScript
└── utils/              # Fonctions utilitaires
```

## 🚦 Démarrage

### Prérequis
- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd web

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer en développement
npm run dev
```

### Variables d'Environnement

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Démarrage en développement
npm run build        # Build de production
npm run start        # Démarrage en production
npm run lint         # Linting du code
npm run type-check   # Vérification TypeScript
```

## 🏗️ Architecture

### Gestion des États
- **Global** : Zustand (auth, thème)
- **Serveur** : TanStack Query (cache, sync)
- **Local** : React hooks (useState, useReducer)

### Routing
- App Router (Next.js 13+)
- Layouts partagés
- Route protection
- Middleware de sécurité

### Styling
- Tailwind CSS
- CSS Modules
- Composants Shadcn/ui
- Dark mode support

## 🔧 Bonnes Pratiques

### Code Quality
- ESLint + Prettier
- TypeScript strict mode
- Conventional commits
- Pre-commit hooks

### Performance
- Code splitting automatique
- Image optimization
- Lazy loading
- Bundle analysis

### Sécurité
- Input validation
- XSS protection
- CSRF protection
- Secure headers

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit avec conventional commits
4. Push et créer une Pull Request

## 📄 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.
