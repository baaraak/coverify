const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  plugins: [
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Coverify',
        short_name: 'Coverify',
        start_url: `/`,
        background_color: `#191414`,
        theme_color: `#191414`,
        display: `standalone`,
        icon: 'src/assets/favicon.png',
      },
    },
  ],
  developMiddleware: app => {
    app.use(
      '/.netlify',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' },
        changeOrigin: true,
      })
    )
  },
}
