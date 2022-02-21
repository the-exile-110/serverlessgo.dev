import GA from '@/components/analytics/google-analytics'
import Plausible from '@/components/analytics/plausible'
import SimpleAnalytics from '@/components/analytics/simple-analytics'
import siteMetadata from '@/data/site-metadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
    </>
  )
}

export default Analytics
