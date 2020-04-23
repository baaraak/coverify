import ReactGA from 'react-ga'

class Analytics {
  trackingCode: string

  constructor({ trackingCode }: { trackingCode: string }) {
    this.trackingCode = trackingCode
  }

  public init() {
    ReactGA.initialize(this.trackingCode)
  }

  public logPageView() {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }

  public logEvent(category = '', action = '') {
    if (category && action) {
      ReactGA.event({ category, action })
    }
  }
}

export { Analytics }
