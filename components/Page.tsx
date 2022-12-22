import { FunctionComponent } from 'preact';
import { Head } from '$fresh/runtime.ts';

import SearchBar from '../islands/SearchBar.tsx';
import { useTranslate } from '../utils.ts';
import Header from './Header.tsx';

export default (({ children }) => {
  const { t, lang } = useTranslate();

  return (
    <div class="bg-red-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>{t`TITLE`}</title>
        <link crossOrigin="use-credentials" rel="manifest" href={`/manifest.${lang}.webmanifest`} />
      </Head>

      <Header />
      <SearchBar />
      <div className="p-4 sm:p-8 dark:text-blue-100">{children}</div>
    </div>
  );
}) as FunctionComponent;
