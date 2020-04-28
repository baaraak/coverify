require('dotenv').config()
const withImages = require('next-images')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = withImages({
  webpack(config) {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
  experimental: {
    reactRefresh: true,
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_URL: process.env.SPOTIFY_URL,
    ANALYTICS: process.env.ANALYTICS,
  },
  typescript: {
    ignoreDevErrors: true,
  },
})
