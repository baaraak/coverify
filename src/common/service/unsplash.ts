import axios from 'axios'

type Response = Array<{
  id?: string
  alt_description?: string
  urls?: Record<'raw' | 'regular' | 'full', string>
  color?: string
  user?: {
    name: string
    links: { html: string }
  }
}>

/**
 * Handle the image api
 */
class UnSplash {
  /**
   * Mark image as download
   */
  public async downloadImage(id: string) {
    axios.get(`.netlify/functions/download`, { params: { id } })
  }

  /**
   * Return image based on a query
   */
  public async queryImage(query: string) {
    return await axios.get<Response>('api/images', {
      params: { query },
    })
  }
}

export { UnSplash }
