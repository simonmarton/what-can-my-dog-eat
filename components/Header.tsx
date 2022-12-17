import { availableLangs } from '../models.ts';
import { useTranslate } from '../utils.ts';

export default () => {
  const { t, lang: currentLang } = useTranslate();

  console.log(location);

  return (
    <div
      class="bg-blue-400 dark:bg-blue-900 dark:text-blue-100 shadow-lg
             w-full py-3 px-4 sm:py-6 sm:px-8
             flex flex-row items-center gap-4"
    >
      <div class="flex flex-1 text-lg sm:text-2xl font-bold">{t`ALT_TITLE`}</div>

      <ul>
        {availableLangs
          .filter((lang) => lang !== currentLang)
          .map((lang) => (
            <li>
              <a href={`/${lang}`} class="sm:text-lg underline">
                {lang}
              </a>
              {/* <a href={location.pathname.replace(`/${currentLang}`, `/${lang}`)}>{lang}</a> */}
            </li>
          ))}
      </ul>
    </div>
  );
};
