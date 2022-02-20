import Link from "@/components/link";
import PageTitle from "@/components/page-title";
import SectionContainer from "@/components/section-container";
import { BlogSeo } from "@/components/seo";
import Image from "next/image";
import Tag from "@/components/tag";
import siteMetadata from "@/data/siteMetadata";
import useTranslation from "next-translate/useTranslation";
import formatDate from "@/lib/utils/formatDate";
import { useRouter } from "next/router";

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, date, title, tags } = frontMatter;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <SectionContainer>
      <BlogSeo
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article className="flex justify-center w-full mt-5">
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <PageTitle>{title}</PageTitle>
            </div>
          </header>
          {/* tags & 作者栏 */}
          <div className="flex flex-row items-center content-center justify-center space-x-5">
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(new Date(date), locale)}</time>
            </dd>
            {tags && (
              <div className="py-4 xl:py-8">
                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Tags
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )}
            <div>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">{t("common:name")}</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace("https://twitter.com/", "@")}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </div>
          {/* blog */}
          <div className="pb-8 divide-y divide-gray-200">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="flex flex-col content-center justify-center w-full pt-10 pb-8 prose dark:prose-dark">
                {children}
              </div>
            </div>
            {/* footer */}
            <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {t("common:preva")}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        {t("common:nexta")}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                &larr; {t("common:back")}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
