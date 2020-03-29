require('dotenv').config()

const axios = require('axios')

export const handler = async event => {
  const id = event.queryStringParameters.id

  await axios.get(`https://api.unsplash.com/photos/${id}/download`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  return {
    statusCode: 200,
    body: 'Success',
  }
}
