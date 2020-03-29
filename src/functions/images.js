require('dotenv').config()

const axios = require('axios')

export const handler = async (event, context, callback) => {
  const query = event.queryStringParameters.query

  const data = await axios.get('https://api.unsplash.com/search/photos', {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}` },
    params: { query, per_page: 30 },
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data.data.results),
  })
}
