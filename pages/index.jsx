import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/site-metadata';
import ListLayout from '@/components/layouts/list-layout';
import { PageSeo } from '@/components/seo';

import useTranslation from 'next-translate/useTranslation';

export const POSTS_PER_PAGE = 5;

export async function getStaticProps({ locale, defaultLocale }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const posts = await getAllFilesFrontMatter('blog', otherLocale);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
  };

  return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  const { t } = useTranslation();
  return (
    <>
      <PageSeo title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('common:all')}
      />
    </>
  );
}
