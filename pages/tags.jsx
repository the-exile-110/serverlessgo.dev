import Link from '@/components/link';
import { PageSeo } from '@/components/seo';
import Tag from '@/components/tag';
import siteMetadata from '@/data/site-metadata';
import { getAllTags } from '@/lib/tags';
import kebabCase from '@/lib/utils/kebabCase';

export async function getStaticProps({ defaultLocale, locale }) {
  const otherLocale = locale !== defaultLocale ? locale : '';
  const tags = await getAllTags('blog', otherLocale);

  return { props: { tags } };
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSeo title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex content-center justify-center w-full pb-550">
        <div className="flex flex-row content-center w-2/3">
          <div className="flex flex-col content-center justify-between w-full">
            <div className="pt-6 pb-8 mt-6 space-x-2 md:space-y-5">
              <h1 className="pb-5 text-3xl font-extrabold leading-9 tracking-tight text-center text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-b-2 md:px-6">
                Tags
              </h1>
            </div>
            <div className="flex w-full h-full align-top">
              <div className="flex flex-wrap w-full max-h-5">
                {Object.keys(tags).length === 0 && 'No tags found.'}
                {sortedTags.map((t) => {
                  return (
                    <Link
                      key={t}
                      href={`/tags/${kebabCase(t)}`}
                      className="p-3 m-5 -ml-2 text-sm font-semibold text-gray-600 uppercase bg-white rounded-md shadow-md dark:text-slate-100 dark:bg-slate-500 hover:bg-slate-200"
                    >
                      <Tag text={t} />
                      {` (${tags[t]})`}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
