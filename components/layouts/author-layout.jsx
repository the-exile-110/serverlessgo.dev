import Image from '@/components/image';
import { PageSeo } from '@/components/seo';
import SocialIcon from '@/assets/social-icons';

import useTranslation from 'next-translate/useTranslation';

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, github, twitter } = frontMatter;
  const { t } = useTranslation();

  return (
    <>
      <PageSeo title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="mt-5 divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <div className="flex justify-center p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600">
              <Image
                src={avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="w-48 h-48 rounded-full"
              />
            </div>
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  );
}
