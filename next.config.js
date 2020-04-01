const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack(config) {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    })

    return config
  },
}
