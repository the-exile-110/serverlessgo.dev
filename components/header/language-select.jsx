import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TranslateIcon } from '@heroicons/react/solid';

const LanguageSelect = () => {
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };

  const languages = [
    {
      name: 'English',
      value: 'en',
      icon: <English className="w-5 h-5 mr-2" aria-hidden="true" />
    },
    {
      name: '中文',
      value: 'zh',
      icon: <China className="w-5 h-5 mr-2" aria-hidden="true" />
    },
    {
      name: '日本語',
      value: 'jp',
      icon: <Japan className="w-5 h-5 mr-2" aria-hidden="true" />
    }
  ];

  return (
    <div>
      <Menu as="div" className="relative inline-block text-center">
        <div>
          <Menu.Button className="p-1 text-gray-400 rounded-full dark:text-gray-200 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-400">
            <TranslateIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-5 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-600 ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              {languages.map((locale) => (
                <Menu.Item key={locale.value}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? ' bg-gray-200 text-gray-900' : 'text-gray-900 dark:text-gray-300'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => changeLanguage(locale.value)}
                    >
                      {locale.icon}
                      {locale.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

function China(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <path id="a" fill="#ffde00" d="M-.6.8 0-1 .6.8-1-.3h2z" />
      </defs>
      <path fill="#de2910" d="M0 0h640v480H0z" />
      <use xlinkHref="#a" width={30} height={20} transform="matrix(71.9991 0 0 72 120 120)" />
      <use
        xlinkHref="#a"
        width={30}
        height={20}
        transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"
      />
      <use
        xlinkHref="#a"
        width={30}
        height={20}
        transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"
      />
      <use
        xlinkHref="#a"
        width={30}
        height={20}
        transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)"
      />
      <use
        xlinkHref="#a"
        width={30}
        height={20}
        transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)"
      />
    </svg>
  );
}

function Japan(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <clipPath id="a">
          <path fillOpacity={0.7} d="M-88 32h640v480H-88z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#a)" transform="translate(88 -32)">
        <path fill="#fff" d="M-128 32h720v480h-720z" />
        <circle
          cx={523.1}
          cy={344.1}
          r={194.9}
          fill="#d30000"
          transform="translate(-168.4 8.6) scale(.76554)"
        />
      </g>
    </svg>
  );
}

function English(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
      />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
    </svg>
  );
}

export default LanguageSelect;
