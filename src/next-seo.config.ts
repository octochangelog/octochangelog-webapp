import { DefaultSeoProps } from 'next-seo'
import { APP_MOTTO, SITE_TITLE } from '~/common'

const DefaultSEO: DefaultSeoProps = {
  titleTemplate: `%s | ${SITE_TITLE}`,
  description: APP_MOTTO,
  openGraph: {
    type: 'website',
    url: 'https://octoclairvoyant.vercel.app/',
    title: SITE_TITLE,
    description: APP_MOTTO,
    images: [
      {
        url:
          'https://raw.githubusercontent.com/belco90/octoclairvoyant/main/public/mascot-logo.png',
        width: 516,
        height: 516,
        alt: 'Octoclairvoyant mascot reading a crystal ball',
      },
    ],
    site_name: SITE_TITLE,
    profile: {
      firstName: 'Mario',
      lastName: 'Beltrán Alarcón',
    },
  },
  twitter: {
    handle: '@belcoDev',
    cardType: 'summary',
    site: '@belcoDev',
  },
}

export default DefaultSEO
