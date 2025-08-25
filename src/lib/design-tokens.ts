/**
 * Design Tokens for CourierPlus
 * Based on logistics/warehouse theme with blue trucks, orange accents, and professional workflow
 */

export const designTokens = {
  // Color Palette inspired by the logistics illustration
  colors: {
    // Primary Blues (from the delivery truck and worker uniforms)
    primary: {
      50: 'oklch(0.97 0.02 240)',   // Very light blue
      100: 'oklch(0.94 0.04 240)',  // Light blue
      200: 'oklch(0.88 0.08 240)',  // Soft blue
      300: 'oklch(0.78 0.12 240)',  // Medium light blue
      400: 'oklch(0.65 0.16 240)',  // Medium blue
      500: 'oklch(0.52 0.20 240)',  // Base primary blue
      600: 'oklch(0.42 0.18 240)',  // Dark blue
      700: 'oklch(0.35 0.16 240)',  // Darker blue
      800: 'oklch(0.28 0.14 240)',  // Very dark blue
      900: 'oklch(0.20 0.12 240)',  // Deepest blue
      950: 'oklch(0.15 0.10 240)',  // Near black blue
    },
    
    // Secondary Orange/Yellow (from conveyor belts and warehouse equipment)
    secondary: {
      50: 'oklch(0.98 0.02 50)',    // Very light orange
      100: 'oklch(0.95 0.05 50)',   // Light orange
      200: 'oklch(0.90 0.10 50)',   // Soft orange
      300: 'oklch(0.82 0.15 50)',   // Medium light orange
      400: 'oklch(0.72 0.20 50)',   // Medium orange
      500: 'oklch(0.65 0.22 50)',   // Base secondary orange
      600: 'oklch(0.58 0.20 50)',   // Dark orange
      700: 'oklch(0.48 0.18 50)',   // Darker orange
      800: 'oklch(0.38 0.16 50)',   // Very dark orange
      900: 'oklch(0.28 0.14 50)',   // Deepest orange
      950: 'oklch(0.20 0.12 50)',   // Near black orange
    },
    
    // Neutral Grays (from warehouse floors and equipment)
    neutral: {
      50: 'oklch(0.99 0.00 0)',     // Almost white
      100: 'oklch(0.97 0.00 0)',    // Very light gray
      200: 'oklch(0.94 0.00 0)',    // Light gray
      300: 'oklch(0.88 0.00 0)',    // Soft gray
      400: 'oklch(0.75 0.00 0)',    // Medium light gray
      500: 'oklch(0.60 0.00 0)',    // Medium gray
      600: 'oklch(0.48 0.00 0)',    // Dark gray
      700: 'oklch(0.38 0.00 0)',    // Darker gray
      800: 'oklch(0.25 0.00 0)',    // Very dark gray
      900: 'oklch(0.15 0.00 0)',    // Near black
      950: 'oklch(0.08 0.00 0)',    // Almost black
    },
    
    // Accent colors for status and actions
    accent: {
      success: 'oklch(0.65 0.15 140)',    // Green for delivered/completed
      warning: 'oklch(0.70 0.18 70)',     // Yellow for in-transit/pending  
      danger: 'oklch(0.60 0.20 25)',      // Red for issues/cancelled
      info: 'oklch(0.65 0.15 250)',       // Light blue for information
    },
    
    // Package status colors
    package: {
      pending: 'oklch(0.70 0.15 60)',     // Orange-yellow
      processing: 'oklch(0.60 0.18 220)', // Blue
      shipped: 'oklch(0.65 0.12 200)',    // Light blue
      delivered: 'oklch(0.55 0.15 140)',  // Green
      delayed: 'oklch(0.68 0.20 40)',     // Amber
      cancelled: 'oklch(0.55 0.18 15)',   // Red
    }
  },
  
  // Typography inspired by logistics industry
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      display: ['Inter', 'system-ui', 'sans-serif'], // For headings and hero text
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },
  
  // Spacing based on logistics grid systems
  spacing: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  
  // Border radius for logistics UI elements
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows for depth and elevation
  boxShadow: {
    sm: '0 1px 2px 0 oklch(0.15 0 0 / 0.05)',
    default: '0 1px 3px 0 oklch(0.15 0 0 / 0.1), 0 1px 2px -1px oklch(0.15 0 0 / 0.1)',
    md: '0 4px 6px -1px oklch(0.15 0 0 / 0.1), 0 2px 4px -2px oklch(0.15 0 0 / 0.1)',
    lg: '0 10px 15px -3px oklch(0.15 0 0 / 0.1), 0 4px 6px -4px oklch(0.15 0 0 / 0.1)',
    xl: '0 20px 25px -5px oklch(0.15 0 0 / 0.1), 0 8px 10px -6px oklch(0.15 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px oklch(0.15 0 0 / 0.25)',
  },
  
  // Animation timing for logistics UI interactions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  // Component-specific design tokens
  components: {
    // Delivery truck inspired card styling
    card: {
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-6)',
      shadow: 'var(--shadow-md)',
    },
    
    // Package-like button styling
    button: {
      primary: {
        background: 'var(--color-primary-500)',
        color: 'var(--color-neutral-50)',
        borderRadius: 'var(--radius-md)',
        padding: '0.5rem 1rem',
        fontWeight: '500',
      },
      secondary: {
        background: 'var(--color-secondary-500)',
        color: 'var(--color-neutral-50)',
        borderRadius: 'var(--radius-md)',
        padding: '0.5rem 1rem',
        fontWeight: '500',
      }
    },
    
    // Warehouse grid layout
    grid: {
      gap: 'var(--spacing-4)',
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        wide: 4,
      }
    }
  }
} as const;

export type DesignTokens = typeof designTokens;