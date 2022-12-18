type DictEntry = {
  en: string;
  hu: string;
};

export type Dict = {
  descriptions: DictEntry[];
  names: DictEntry[];
};

export type Category = 'harmful' | 'moderate' | 'good';

export type Food = {
  id: string;
  category: Category;
  name: DictEntry;
  descriptionDictIdx: number;
};
export type Foods = Food[];

export type SearchResult = {
  id: string;
  category: Category;
  name: string; // meh
};

export const availableLangs = ['en', 'hu'] as const;
export type Lang = typeof availableLangs[number];
