import axios from 'axios'

type Response = {
  data: Array<{
    id?: string
    alt_description?: string
    urls?: Record<'raw' | 'regular' | 'full' | 'small', string>
    color?: string
    width?: number
    height?: number
    user?: {
      name: string
      links: { html: string }
    }
  }>
}

/**
 * Handle the image api
 */
class UnSplash {
  /**
   * Mark image as download
   */
  public async downloadImage(id: string) {
    axios.get(`api/download`, { params: { id } })
  }

  /**
   * Return image based on a query
   */
  public async queryImage(query: string) {
    const { data } = await axios.get<Response>('api/images', {
      params: { query },
    })

    return data
  }
}

export { UnSplash }
