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
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_URL: process.env.SPOTIFY_URL,
  },
  typescript: {
    // TODO: Should be remove as soon as possible
    ignoreBuildErrors: true,
    ignoreDevErrors: true,
  },
})
