export type ColorVariant =
  | 'primary'
  | 'dark'
  | 'black'
  | 'grey'
  | 'white'
  | 'white-light'
  | 'white-lighter'
  | 'error'
type Colors = Record<ColorVariant, string>

export type FontSizeVariant = 'small' | 'normal' | 'medium' | 'heading' | 'huge'
type FontSizes = Record<FontSizeVariant, string>

export interface Theme {
  settings: Record<'fontSizeBase' | 'fontFamilyBase', number | string>
  colors: Colors
  fontSizes: FontSizes
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

const FONT_SIZE_BASE = 16
const pxToEm = (px: number): string => `${px / FONT_SIZE_BASE}em`

const theme: Theme = {
  settings: {
    fontSizeBase: FONT_SIZE_BASE,
    fontFamilyBase: 'Montserrat',
  },
  colors: {
    black: '#000000',
    primary: '#1db954',
    dark: '#141414',
    grey: '#363535',
    white: '#ffffff',
    'white-light': '#ffffff70',
    'white-lighter': '#ffffff15',
    error: '#d24444',
  },
  fontSizes: {
    small: pxToEm(12),
    normal: pxToEm(14),
    medium: pxToEm(16),
    heading: pxToEm(18),
    huge: pxToEm(48),
  },
}

export { theme }
