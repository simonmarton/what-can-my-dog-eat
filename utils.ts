import { useContext } from 'preact/hooks';
import { createContext } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

import dict from './dict.ts';
import { Lang } from './models.ts';

export const parseLang = (lang: unknown): Lang => {
  const available = ['en', 'hu'];

  if (!lang || !available.includes(String(lang))) {
    return 'en';
  }

  return lang as Lang;
};

export const LangCtx = createContext<Lang>('en');

export const useTranslate = () => {
  const lang = IS_BROWSER ? window.lang : useContext(LangCtx);

  return { t: getTranslate(lang), lang };
};

export const getTranslate =
  (lang: Lang) =>
  ([key]: TemplateStringsArray) =>
    dict[key]?.[lang] ?? `%${key}%`;
