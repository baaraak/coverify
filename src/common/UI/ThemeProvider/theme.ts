export type ColorVariant =
  | 'primary'
  | 'dark'
  | 'black'
  | 'grey'
  | 'white'
  | 'white-light'
  | 'white-lighter'
  | 'error'
export type FontSizeVariant =
  | 'small'
  | 'normal'
  | 'medium'
  | 'heading'
  | 'title'
  | 'huge'

const FONT_SIZE_BASE = 16
const pxToEm = (px: number): string => `${px / FONT_SIZE_BASE}em`

const theme = {
  settings: {
    fontSizeBase: FONT_SIZE_BASE,
    fontFamilyBase: 'Montserrat',
  },
  colors: {
    black: '#000000',
    primary: '#1db954',
    dark: '#101010',
    grey: '#262525',
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
    title: pxToEm(30),
    huge: pxToEm(48),
  },
}

export type Theme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export { theme, FONT_SIZE_BASE }
