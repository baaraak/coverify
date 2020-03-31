
type ColorVariant = 'primary' | 'black' | 'grey' | 'white'
type Colors = Record<ColorVariant, string>

type FontSizeVariant = 'small' | 'normal' | 'medium' | 'heading' | 'huge'
type FontSizes = Record<FontSizeVariant, number>

interface Theme {
  settings: Record<'fontSizeBase' | 'fontFamilyBase', number | string>
  colors: Colors
  fontSizes: FontSizes
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

const theme: Theme = {
  settings: {
    fontSizeBase: 16,
    fontFamilyBase: '',
  },
  colors: {
    primary: '#1db954',
    black: '#141414',
    grey: '363535',
    white: '#fff',
  },
  fontSizes: {
    small: 12,
    normal: 14,
    medium: 16,
    heading: 18,
    huge: 48,
  },
}

export { theme }
// TODO: Waiting for prettier 2.0
/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-undef
export type { Theme }

