import Link from '@/components/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import ThemeSwitch from '@/components/header/theme-switch';
import LanguageSelect from '@/components/header/language-select';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'All posts', href: '/all-posts' },
  { name: 'Projects', href: '/projects' },
  { name: 'Tags', href: '/tags' },
  { name: 'About', href: '/about' }
];

const Header = () => {
  const router = useRouter();
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-20 flex flex-col items-center justify-between w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-black bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg firefox:bg-opacity-100 dark:firefox:bg-opacity-100"
    >
      {({ open }) => (
        <>
          <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link href={item.href}>
                      <a
                        key={item.name}
                        className={classnames(
                          item.href === router.pathname
                            ? 'border-sky-300 dark:border-white text-gray-900 dark:text-gray-50'
                            : 'border-transparent text-gray-900 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium h-full focus:outline-none transition-colors duration-150'
                        )}
                        aria-current={item.href === router.pathname ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden space-x-5 sm:ml-6 sm:flex sm:items-center">
                <ThemeSwitch />
                <LanguageSelect />
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="w-full sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link href={item.href}>
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    className={classnames(
                      item.href === router.pathname
                        ? 'bg-indigo-50 dark:bg-gray-500 border-sky-500 text-sky-700 dark:text-gray-50'
                        : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.href === router.pathname ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-end px-4 space-x-5">
                <ThemeSwitch />
                <LanguageSelect />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
