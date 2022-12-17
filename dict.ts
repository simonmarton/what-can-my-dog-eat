import { Lang } from './models.ts';

export default {
  TITLE: {
    en: 'What can my dog eat?',
    hu: 'Mit ehet a kutyám?',
  },
  ALT_TITLE: {
    en: 'Should Pedro eat that? 🤔',
    hu: 'Ezt biztosan megeheti Pedro? 🤔',
  },
  SEARCH: {
    en: 'Search',
    hu: 'Keresés',
  },
} as {
  [key: string]: {
    [key in Lang]: string;
  };
};
