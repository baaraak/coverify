// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

export const APP_NAME = 'Coverify'
export const DESCRIPTION = pkg.description
export const SHORT_DESCRIPTION =
  'Create your custom cover for your Spotify playlists.'
export const URL = pkg.url

// Share
export const SHARE_GITHUB = 'http://github.com/danilowoz/coverify/'
export const SHARE_TWIITER = `https://twitter.com/intent/tweet?text=${APP_NAME} - ${DESCRIPTION} %0A%0A${URL}
`

// Content
export const MENU: Array<{ text: string; href: string }> = [
  {
    text: 'Codebase',
    href: SHARE_GITHUB,
  },
  {
    text: 'Issues',
    href: `${SHARE_GITHUB}/issues/`,
  },
  {
    text: 'Share to Twitter',
    href: SHARE_TWIITER,
  },
]

// Animation & transitions
export const WHILE_HOVER = { scale: 1.02 }
export const WHILE_TAP = { scale: 0.95 }
