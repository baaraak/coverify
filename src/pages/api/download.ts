require('dotenv').config()

import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'

export default async (req: NowRequest, res: NowResponse) => {
  const { id } = req.query

  await axios.get(`https://api.unsplash.com/photos/${id}/download`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  res.json({ data: 'Success' })
}
