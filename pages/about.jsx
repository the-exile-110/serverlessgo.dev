import { MDXLayoutRenderer } from '@/components/mdx-components'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'author-layout'

export async function getStaticProps({ locale, defaultLocale }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const authorDetails = await getFileBySlug('authors', [`default`], otherLocale)
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
