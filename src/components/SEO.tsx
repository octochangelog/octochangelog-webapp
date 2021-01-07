import Head from 'next/head'

import { APP_MOTTO, SITE_TITLE } from '~/common'

type Props = {
  title?: string
  description?: string
}

const SEO = ({ title, description }: Props) => {
  const metaDescription = description || APP_MOTTO
  const combinedTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE

  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content="GitHub Release Repository Changelog" />
      <meta property="og:title" content={combinedTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={SITE_TITLE} />
      <meta
        name="twitter:image"
        content="https://raw.githubusercontent.com/belco90/octoclairvoyant/main/public/mascot-logo.png"
      />
      <meta name="twitter:creator" content="@belcoDev" />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  )
}

export default SEO
