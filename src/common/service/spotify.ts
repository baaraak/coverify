import axios from 'axios'

const API = 'https://api.spotify.com/v1'

type ResponseMe = { display_name?: string; images?: Array<{ url?: string }> }
type ResponsePlaylist = {
  items: Array<{
    id?: string
    images?: Array<{ url?: string }>
    name?: string
    owner?: { display_name?: string }
  }>
}
type ResponseGetUSerPlaylist = ResponsePlaylist['items']
type ResponseGetUserInformation = { userName: string; userImage: string }

class Spotify {
  private token: string

  constructor({ token }: { token: string }) {
    this.token = token
  }

  public async getUserInformation(): Promise<ResponseGetUserInformation> {
    const dataFromApi = await axios.get<ResponseMe>(`${API}/me`, {
      headers: { Authorization: `Bearer ${this.token}` },
    })

    return {
      userName: dataFromApi?.data?.display_name ?? 'Who are you?',
      userImage: dataFromApi?.data?.images?.[0].url ?? '',
    }
  }

  public async getUserPlaylist(): Promise<ResponseGetUSerPlaylist> {
    const dataFromApi = await axios.get<ResponsePlaylist>(
      `${API}/me/playlists`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
        params: { limit: 50 },
      }
    )

    return dataFromApi.data.items
  }

  public async updatePlaylistCover(playlistId: string, imgData: string) {
    return await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      imgData,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'image/jpeg',
        },
      }
    )
  }
}

export { Spotify }
