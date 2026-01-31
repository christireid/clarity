/**
 * Design System - Minimal Sophisticated Glassmorphism
 * Inspired by Prompt Kit & shadcn with unique modern aesthetics
 */

// =============================================================================
// COLOR SYSTEM - Sophisticated Palette
// =============================================================================

export const colors = {
  // Primary - Deep sophisticated blues
  primary: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#b9dcfe',
    300: '#7cc0fd',
    400: '#36a4fa',
    500: '#0c8ce9',
    600: '#006fcc',
    700: '#0058a6',
    800: '#004a89',
    900: '#003f72',
    950: '#00284c',
  },
  
  // Accent - Vibrant purples
  accent: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  
  // Neutral - Warm grays
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  
  // Success
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    900: '#064e3b',
  },
  
  // Warning
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    900: '#78350f',
  },
  
  // Error
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
};

// =============================================================================
// GLASSMORPHISM SYSTEM - Enhanced
// =============================================================================

export const glass = {
  // Blur levels - Increased for stronger effect
  blur: {
    sm: 'blur(8px)',
    md: 'blur(16px)',
    lg: 'blur(20px)',
    xl: 'blur(24px)',
    '2xl': 'blur(32px)',
  },
  
  // Background opacity - More transparent
  bg: {
    subtle: 'rgba(255, 255, 255, 0.03)',
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    heavy: 'rgba(255, 255, 255, 0.12)',
  },
  
  // Border treatments - More subtle
  border: {
    subtle: '1px solid rgba(255, 255, 255, 0.08)',
    medium: '1px solid rgba(255, 255, 255, 0.12)',
    heavy: '1px solid rgba(255, 255, 255, 0.16)',
  },
  
  // Shadow combinations - Softer
  shadow: {
    sm: '0 2px 16px rgba(0, 0, 0, 0.03), 0 1px 4px rgba(0, 0, 0, 0.04)',
    md: '0 4px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.10), 0 8px 20px rgba(0, 0, 0, 0.08)',
    inner: 'inset 0 1px 3px rgba(0, 0, 0, 0.04)',
  },
};

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export const typography = {
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
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
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
  },
};

// =============================================================================
// SPACING SYSTEM - Minimal, 4px base unit
// =============================================================================

export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
};

// =============================================================================
// BORDER RADIUS SYSTEM
// =============================================================================

export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export const animation = {
  duration: {
    instant: '75ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.45, 0, 0.15, 1)',
  },
};

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const variants = {
  button: {
    primary: {
      bg: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
      hover: 'linear-gradient(135deg, var(--primary-600), var(--accent-600))',
      text: 'white',
      shadow: glass.shadow.md,
    },
    secondary: {
      bg: glass.bg.light,
      hover: glass.bg.medium,
      text: 'var(--foreground)',
      border: glass.border.medium,
      shadow: glass.shadow.sm,
    },
    ghost: {
      bg: 'transparent',
      hover: glass.bg.subtle,
      text: 'var(--foreground)',
      shadow: 'none',
    },
  },
  
  card: {
    glass: {
      bg: glass.bg.light,
      border: glass.border.medium,
      blur: glass.blur.lg,
      shadow: glass.shadow.lg,
    },
    elevated: {
      bg: 'var(--card)',
      border: '1px solid var(--border)',
      shadow: glass.shadow.xl,
    },
    flat: {
      bg: 'var(--card)',
      border: '1px solid var(--border)',
      shadow: 'none',
    },
  },
  
  input: {
    default: {
      bg: glass.bg.subtle,
      border: glass.border.subtle,
      focus: glass.border.heavy,
      shadow: glass.shadow.inner,
    },
    elevated: {
      bg: 'var(--card)',
      border: '1px solid var(--border)',
      focus: '1px solid var(--primary-500)',
      shadow: glass.shadow.sm,
    },
  },
};

// =============================================================================
// THEME PRESETS
// =============================================================================

export const themes = {
  light: {
    background: colors.neutral[50],
    foreground: colors.neutral[900],
    card: '#ffffff',
    cardForeground: colors.neutral[900],
    primary: colors.primary[600],
    primaryForeground: '#ffffff',
    accent: colors.accent[500],
    accentForeground: '#ffffff',
    muted: colors.neutral[100],
    mutedForeground: colors.neutral[600],
    border: colors.neutral[200],
    ring: colors.primary[400],
  },
  
  dark: {
    background: colors.neutral[950],
    foreground: colors.neutral[50],
    card: colors.neutral[900],
    cardForeground: colors.neutral[50],
    primary: colors.primary[500],
    primaryForeground: '#ffffff',
    accent: colors.accent[500],
    accentForeground: '#ffffff',
    muted: colors.neutral[800],
    mutedForeground: colors.neutral[400],
    border: colors.neutral[800],
    ring: colors.primary[500],
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const utils = {
  /**
   * Create glassmorphism style object
   */
  glassStyle: (variant: 'subtle' | 'light' | 'medium' | 'heavy' = 'light') => ({
    background: glass.bg[variant],
    backdropFilter: glass.blur.lg,
    border: glass.border.medium,
    boxShadow: glass.shadow.md,
  }),
  
  /**
   * Create gradient text style
   */
  gradientText: (from: string, to: string) => ({
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
  
  /**
   * Create smooth transition
   */
  transition: (properties: string[] = ['all']) => ({
    transition: properties
      .map((prop) => `${prop} ${animation.duration.normal} ${animation.easing.smooth}`)
      .join(', '),
  }),
};

export default {
  colors,
  glass,
  typography,
  spacing,
  radius,
  animation,
  variants,
  themes,
  utils,
};
