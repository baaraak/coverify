import { Spotify } from './service/spotify'

const initialServices = { spotifyService: undefined }
let context: { spotifyService?: Spotify } = initialServices

const createServicesContext = (spotifyToken: string) => {
  context = {
    spotifyService: new Spotify(spotifyToken),
  }
}

const eraseServicesContext = () => {
  context = initialServices
}

export { context, createServicesContext, eraseServicesContext }
