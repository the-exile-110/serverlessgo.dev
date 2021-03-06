import siteMetadata from '@/data/site-metadata'
import projectsData from '@/data/projects-data'
import Card from '@/components/card'
import { PageSeo } from '@/components/seo'
import useTranslation from 'next-translate/useTranslation'

import { useRouter } from 'next/router'

export default function Projects() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <>
      <PageSeo title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('projects:title')}
          </h1>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {projectsData[locale]?.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
