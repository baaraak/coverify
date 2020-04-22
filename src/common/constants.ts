import i18n from './i18n'

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
    text: i18n.t('menu.codebase'),
    href: SHARE_GITHUB,
  },
  {
    text: i18n.t('menu.issues'),
    href: `${SHARE_GITHUB}/issues/`,
  },
  {
    text: i18n.t('menu.codebase', { where: i18n.t('twitter') }),
    href: SHARE_TWITTER,
  },
]
