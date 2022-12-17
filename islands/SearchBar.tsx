import { createRef, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import IconZoomQuestion from '@icons/zoom-question.tsx';

import { useTranslate } from '../utils.ts';

const SearchBar = () => {
  const inputRef = createRef();
  const [query, setQuery] = useState('');
  const { t, lang } = useTranslate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (evt: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    evt.preventDefault();

    console.log({ query, lang });
    window.location.href = `/${lang}/${query}`;
  };

  return (
    <div class="flex gap-1 p-4 sm:p-8">
      <form onSubmit={(e) => handleSubmit(e)} class="flex flex-1 gap-1">
        <input
          type="text"
          class="px-3 py-2 rounded border(blue-900 1) flex-grow sm:flex-grow-0"
          value={query}
          ref={inputRef}
          onInput={({ target }) => setQuery((target as HTMLInputElement).value)}
        />

        <button
          type="submit"
          class="flex gap-2 px-3 py-2 bg-blue-200 text-blue-800 border(blue-900 1) rounded hover:bg-blue-300"
        >
          {t`SEARCH`}
          <IconZoomQuestion class="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
