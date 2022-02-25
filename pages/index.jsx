import Link from '@/components/link';
import { PageSeo } from '@/components/seo';
import Tag from '@/components/tag';
import siteMetadata from '@/data/site-metadata';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import formatDate from '@/lib/utils/formatDate';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MAX_DISPLAY = 5;

export async function getStaticProps({ locale, defaultLocale }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const posts = await getAllFilesFrontMatter('blog', otherLocale);

  return { props: { posts } };
}

export default function Home({ posts }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <>
      <PageSeo title={siteMetadata.title} description={siteMetadata.description} />
      <div className="flex flex-col items-center content-center justify-center w-5/6 mt-5 divide-y divide-gray-200 pb-52 dark:divide-gray-700">
        <div className="flex flex-col items-center content-center justify-center w-full pt-6 pb-4 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('common:greeting')}
          </h1>
        </div>
        <ul className="max-w-4xl divide-y divide-gray-200 min-w-4xl dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, tags, image } = frontMatter;
            return (
              <li key={slug} className="min-w-full py-12">
                <article className="flex flex-col items-center content-center justify-center ">
                  <div className="flex flex-row justify-between w-auto max-w-2xl p-3 space-y-2 bg-white rounded-md shadow-md min-w-5/6 dark:bg-gray-600">
                    <div className="w-2/5 mr-2 space-y-5 xl:col-span-3">
                      <Image
                        src={image}
                        alt="avatar"
                        width="200px"
                        height="200px"
                        className="w-48 h-48 "
                      />
                    </div>
                    <div className="flex flex-col justify-between w-full space-y-5 xl:col-span-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                        <dl>
                          <dt className="sr-only">{t('common:pub')}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, locale)}</time>
                          </dd>
                        </dl>
                      </div>

                      <div className="pb-3 text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-base font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          aria-label={`Read "${title}"`}
                        >
                          {t('common:more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end w-auto text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400"
            aria-label="all posts"
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
