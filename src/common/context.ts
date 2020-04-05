import { Spotify } from './service/spotify'

let context: { spotifyService?: Spotify } = { spotifyService: undefined }

const createServicesContext = (spotifyToken: string) => {
  context = {
    spotifyService: new Spotify(spotifyToken),
  }
}

export { context, createServicesContext }
