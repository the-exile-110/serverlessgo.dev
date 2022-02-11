import { MailIcon } from "@heroicons/react/outline";
import useTranslation from "next-translate/useTranslation";
import useFetch from "use-http";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { t } = useTranslation();
  const { post, response, loading, error } = useFetch("http://localhost:8000");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contactSubmit = async (data) => {
    console.log(data);
    setIsOpen(true);
    await post("/contact", data);
    // TODO 这里换成发送成功的dialog
    if (response.ok) setIsOpen(true);
  };
  return (
    <div className="flex items-center justify-center w-full h-full p-20 dark:bg-gray-600">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl rounded-xl dark:bg-gray-600">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative px-6 py-10 overflow-hidden bg-sky-100 bg-gradient-to-b from-sky-500 to-sky-600 sm:px-10 xl:p-12 dark:bg-gray-500">
              {/* Decorative angle backgrounds */}
              <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="absolute top-0 bottom-0 right-0 hidden w-1/2 pointer-events-none lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={160}
                  height={678}
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg font-medium">{t("contact:title")}</h3>
              <p className="max-w-3xl mt-6 text-base text-teal-50">{t("contact:directions")}</p>
              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">{t("contact:email")}</span>
                </dt>
                <dd className="flex text-base text-teal-50">
                  <MailIcon className="flex-shrink-0 w-6 h-6 text-teal-200" aria-hidden="true" />
                  <span className="ml-3">a6504130@gmail.com</span>
                </dd>
              </dl>
            </div>

            {/* Contact form */}
            <div className="px-6 py-10 bg-gray-50 sm:px-10 lg:col-span-2 xl:p-12 dark:bg-gray-500">
              <h3 className="text-lg font-medium text-warm-gray-900">{t("contact:form.title")}</h3>
              <form
                action="#"
                method="POST"
                className="grid grid-cols-1 mt-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                onSubmit={handleSubmit(contactSubmit)}
              >
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-warm-gray-900"
                  >
                    {t("contact:form.name")}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full px-4 py-3 rounded-md shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 dark:bg-gray-400"
                      required
                      {...register("name")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                    {t("contact:form.email")}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full px-4 py-3 rounded-md shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 dark:bg-gray-400"
                      required
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
                    {t("contact:form.subject")}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="block w-full px-4 py-3 rounded-md shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 dark:bg-gray-400"
                      required
                      {...register("subject")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      {t("contact:form.message")}
                    </label>
                    <span id="message-max" className="text-sm text-warm-gray-500">
                      {t("contact:form.messageDirections")}
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full px-4 py-3 border rounded-md shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 dark:bg-gray-400"
                      aria-describedby="message-max"
                      defaultValue={""}
                      required
                      {...register("message")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:flex sm:justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto dark:text-black"
                  >
                    {t("contact:button.submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
