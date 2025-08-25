# CourierPlus Design System

Un système de design moderne inspiré de l'univers logistique, basé sur l'illustration d'entrepôt avec camions de livraison et équipes de manutention.

## 🎨 Philosophie du Design

Le design system CourierPlus s'inspire de l'efficacité et de la précision du monde logistique :

- **Bleu principal** : Inspiré des camions de livraison et des uniformes des employés
- **Orange secondaire** : Inspiré des équipements d'entrepôt et des tapis roulants
- **Gris neutres** : Inspirés des sols d'entrepôt et des structures industrielles
- **Couleurs de statut** : Pour le suivi des colis et des opérations

## 🎯 Tokens de Design

### Couleurs

#### Palette Principale
```typescript
// Bleu primaire (camions et uniformes)
primary: {
  50: 'oklch(0.97 0.02 240)',   // Très clair
  500: 'oklch(0.52 0.20 240)',  // Base
  900: 'oklch(0.20 0.12 240)',  // Très sombre
}

// Orange secondaire (équipements d'entrepôt)
secondary: {
  50: 'oklch(0.98 0.02 50)',    // Très clair
  500: 'oklch(0.65 0.22 50)',   // Base
  900: 'oklch(0.28 0.14 50)',   // Très sombre
}
```

#### Couleurs de Statut (Suivi des Colis)
- **En attente** : `oklch(0.70 0.15 60)` - Orange-jaune
- **En traitement** : `oklch(0.60 0.18 220)` - Bleu
- **Expédié** : `oklch(0.65 0.12 200)` - Bleu clair
- **Livré** : `oklch(0.55 0.15 140)` - Vert
- **Retardé** : `oklch(0.68 0.20 40)` - Ambre
- **Annulé** : `oklch(0.55 0.18 15)` - Rouge

### Typographie

- **Police principale** : Inter (lisibilité industrielle)
- **Police monospace** : JetBrains Mono (codes de suivi)
- **Hiérarchie** : 8 tailles de xs à 6xl

### Espacement

Système basé sur une grille logistique (multiples de 0.25rem) :
- Base : `1rem` (16px)
- Composants : `1.5rem` (24px) 
- Sections : `3rem` (48px)

## 🧩 Composants Logistiques

### PackageCard
Carte représentant un colis avec son statut de livraison.

```tsx
<PackageCard
  id="CP2024-001"
  status="shipped"
  destination="Paris 75001"
  sender="Entrepôt Lyon"
  weight="2.5kg"
  estimatedDelivery={new Date()}
  trackingNumber="1Z999AA1234567890"
/>
```

**Variantes de statut :**
- `pending` - En attente (ambre)
- `processing` - En traitement (bleu)
- `shipped` - Expédié (bleu primaire avec barre de progression)
- `delivered` - Livré (vert)
- `delayed` - Retardé (orange)
- `cancelled` - Annulé (rouge)

### DeliveryTruck
Représentation d'un camion de livraison avec son état actuel.

```tsx
<DeliveryTruck
  id="T001"
  driver="Jean Dupont"
  currentLocation="Autoroute A6 - Sortie Lyon"
  packagesCount={45}
  capacity={100}
  status="on-route"
  nextDelivery="14:30 - Rue de la Paix"
/>
```

**États disponibles :**
- `idle` - Disponible
- `on-route` - En route (avec animation)
- `delivering` - En livraison (avec indicateur pulsé)
- `maintenance` - Maintenance

### WarehouseStats
Tableau de bord statistique avec métriques d'entrepôt.

```tsx
<WarehouseStats
  stats={{
    totalPackages: 1234,
    packagesChange: { value: 12, trend: "up" },
    activeTrucks: 8,
    trucksChange: { value: 2, trend: "up" },
    activeWorkers: 25,
    workersChange: { value: 5, trend: "neutral" },
    deliveryRate: 94,
    deliveryRateChange: { value: 3, trend: "up" }
  }}
/>
```

### WorkerAvatar
Avatar d'employé avec rôle et statut.

```tsx
<WorkerAvatar
  name="Marie Martin"
  role="warehouse"
  status="active"
  badgeNumber="W015"
  currentTask="Préparation commande #CP2024-567"
  showDetails={true}
/>
```

**Rôles :**
- `driver` - Chauffeur (bleu)
- `warehouse` - Magasinier (orange) 
- `supervisor` - Superviseur (violet)
- `admin` - Administrateur (gris)

**Statuts :**
- `active` - Actif (vert)
- `break` - Pause (jaune)
- `offline` - Hors ligne (gris)
- `busy` - Occupé (rouge pulsé)

## 🏗️ Layouts Logistiques

### LogisticsGrid
Grille adaptée aux contenus logistiques.

```tsx
<LogisticsGrid variant="warehouse">
  {/* Contenu */}
</LogisticsGrid>
```

**Variantes :**
- `warehouse` - 4 colonnes sur desktop
- `dashboard` - 3 colonnes pour tableaux de bord
- `compact` - 4 colonnes compactes

### LoadingDock
Section inspirée des quais de chargement.

```tsx
<LoadingDock
  title="Zone de Chargement"
  dockNumber={3}
  status="loading"
>
  {/* Contenu */}
</LoadingDock>
```

### ConveyorBelt
Layout en tapis roulant pour contenus défilants.

```tsx
<ConveyorBelt direction="horizontal" speed="normal">
  {/* Éléments défilants */}
</ConveyorBelt>
```

### WarehouseAisle
Organisation en allées d'entrepôt.

```tsx
<WarehouseAisle aisleNumber="A1">
  {/* Contenu de l'allée */}
</WarehouseAisle>
```

## 🎭 Thèmes

### Thème Clair (Jour d'Entrepôt)
- Arrière-plan : `oklch(0.99 0.00 0)` - Blanc cassé industriel
- Premier plan : `oklch(0.15 0.00 0)` - Gris très sombre
- Cartes : Blanc pur avec bordures subtiles

### Thème Sombre (Équipe de Nuit)
- Arrière-plan : `oklch(0.08 0.00 0)` - Noir profond
- Premier plan : `oklch(0.97 0.00 0)` - Blanc cassé
- Cartes : Gris sombre avec contrastes élevés

## 🚀 Animations

### Micro-interactions Logistiques
- **Tapis roulant** : `animate-pulse` pour simuler le mouvement
- **Camions en route** : Points bondissants
- **Livraison en cours** : Indicateur pulsé
- **Transitions** : `200ms ease-in-out` pour fluidité industrielle

## 📱 Responsive Design

### Points de Rupture
- **Mobile** : < 768px - 1 colonne
- **Tablette** : 768px-1024px - 2 colonnes
- **Desktop** : 1024px-1440px - 3-4 colonnes
- **Large** : > 1440px - 4+ colonnes

### Adaptations Mobiles
- Cartes empilées verticalement
- Navigation en drawer
- Boutons d'action flottants
- Gestes tactiles optimisés

## ✅ Accessibilité

### Standards WCAG 2.1 AA
- Contrastes élevés (4.5:1 minimum)
- Navigation au clavier
- Lecteurs d'écran compatibles
- Focus visibles
- Textes alternatifs

### Couleurs et Contrastes
- Tous les statuts utilisent des icônes ET des couleurs
- Thème sombre respecte les contrastes
- Pas de dépendance uniquement couleur

## 🔧 Utilisation

### Installation
```bash
npm install # Déjà inclus dans le projet
```

### Import
```typescript
import {
  PackageCard,
  DeliveryTruck,
  WarehouseStats,
  LogisticsGrid,
  WorkerAvatar
} from "@/components/ui";

import { designTokens } from "@/lib/design-tokens";
```

### Configuration CSS
Le système utilise les CSS custom properties définies dans `globals.css` :

```css
:root {
  --primary: oklch(0.52 0.20 240);
  --secondary: oklch(0.65 0.22 50);
  /* ... autres variables */
}
```

## 🎯 Prochaines Étapes

### Composants Planifiés
- [ ] `ShippingRoute` - Visualisation d'itinéraires
- [ ] `InventoryGrid` - Grille de stock
- [ ] `DeliveryTimeline` - Timeline de livraison
- [ ] `WarehouseMap` - Carte interactive
- [ ] `LoadingProgress` - Indicateurs de chargement

### Améliorations
- [ ] Animations plus poussées
- [ ] Support des données temps réel
- [ ] Composants de graphiques avancés
- [ ] Intégration géolocalisation
- [ ] Mode hors ligne

---

*Design System CourierPlus v1.0 - Inspiré de l'efficacité logistique moderne*