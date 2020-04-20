// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json')

// UI
export const APP_NAME = 'Coverify'
export const AUTHOR = 'Danilo Woznica'
export const DESCRIPTION = pkg.description
export const SHORT_DESCRIPTION =
  'Create your custom cover for your Spotify playlists.'
export const URL = pkg.url

export const COVER_ID = 'cover-wrapper'

// Share
const SHARE_GITHUB = 'http://github.com/danilowoz/coverify'
const SHARE_TWITTER = `https://twitter.com/intent/tweet?text=${APP_NAME} - ${DESCRIPTION} %0A%0A${URL}
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
    href: SHARE_TWITTER,
  },
]
