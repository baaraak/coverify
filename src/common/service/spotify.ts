import axios from 'axios'

const API = 'https://api.spotify.com/v1'

type ResponseMe = { display_name: string; images: Array<{ url: string }> }
type ResponseGetUserInformation = { userName: string; userImage: string }

class Spotify {
  private token: string

  constructor(token: string) {
    this.token = token
  }

  public async getUserInformation(): Promise<ResponseGetUserInformation> {
    const dataFromApi = await axios.get<ResponseMe>(`${API}/me`, {
      headers: { Authorization: `Bearer ${this.token}` },
    })

    return {
      userName: dataFromApi.data.display_name,
      userImage: dataFromApi.data.images[0].url,
    }
  }
}

export { Spotify }
