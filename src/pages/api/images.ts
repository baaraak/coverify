require('dotenv').config()

import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'

export default async (req: NowRequest, res: NowResponse) => {
  const query = req.query

  const data = await axios.get('https://api.unsplash.com/search/photos', {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}` },
    // eslint-disable-next-line @typescript-eslint/camelcase
    params: { query, per_page: 30 },
  })

  res.json({ data: data.data.results })
}
