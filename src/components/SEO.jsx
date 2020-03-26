import React from 'react'
import { Helmet } from 'react-helmet'

import {
  appName,
  description,
  shortDescription,
  twitterUsername,
  url,
} from './content'
import shareSrc from '../assets/share.png'

const SEO = () => {
  return (
    <>
      <Helmet>
        <title>{`${appName} - ${shortDescription}`}</title>
        <meta name="description" content={description} />
        <meta name="image" content={shareSrc} />

        <meta property="og:url" content={url} />
        <meta property="og:title" content={appName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={shareSrc} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={twitterUsername} />
        <meta name="twitter:title" content={appName} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareSrc} />

        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </>
  )
}

export default SEO
