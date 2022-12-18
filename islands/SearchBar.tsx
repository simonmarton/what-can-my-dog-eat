import { createRef, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconAlertTriangle from '@icons/alert-triangle.tsx';
import IconAlertOctagon from '@icons/alert-octagon.tsx';
import IconThumbUp from '@icons/thumb-up.tsx';

import { useTranslate } from '../utils.ts';
import { SearchResult } from '../models.ts';

const SearchBar = () => {
  const inputRef = createRef();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { t, lang } = useTranslate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (query) {
      fetch(`/api/list?lang=${lang}&q=${query}`)
        .then((resp) => resp.json())
        .then((res: SearchResult[]) => {
          setResults(res);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div class="flex flex-col p-4 sm:p-8">
      <div className="flex">{}</div>
      <input
        type="text"
        class="px-3 py-2 rounded border(blue-900 1) flex-grow sm:flex-grow-0"
        placeholder={t`SEARCH`}
        value={query}
        ref={inputRef}
        onInput={({ target }) => setQuery((target as HTMLInputElement).value)}
      />

      {results.map(({ id, category, name }) => (
        <a
          href={`/${lang}/${id}`}
          class="flex items-center gap-2 p-2 border-b-1 border-blue-900 dark:bg-white dark:text-blue-900"
        >
          {category === 'good' && <IconThumbUp class="w-4 h-4 text-green-500" />}
          {category === 'moderate' && <IconAlertTriangle class="w-4 h-4 text-yellow-500" />}
          {category === 'harmful' && <IconAlertOctagon class="w-4 h-4 text-red-400" />}
          {name}
        </a>
      ))}
    </div>
  );
};

export default SearchBar;
