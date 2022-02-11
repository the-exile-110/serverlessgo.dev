import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import Contact from "@/components/Contact";

export async function getStaticProps({ locale, defaultLocale }) {
  const otherLocale = locale !== defaultLocale ? locale : "";
  const posts = await getAllFilesFrontMatter("blog", otherLocale);

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Contact />
    </>
  );
}
