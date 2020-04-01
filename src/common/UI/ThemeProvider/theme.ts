export type ColorVariant = 'primary' | 'black' | 'grey' | 'white'
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
    primary: '#1db954',
    black: '#141414',
    grey: '363535',
    white: '#fff',
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
