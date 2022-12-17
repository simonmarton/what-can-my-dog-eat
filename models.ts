type DictEntry = {
  en: string;
  hu: string;
};

export type Dict = {
  descriptions: DictEntry[];
  names: DictEntry[];
};

export type Food = {
  category: 'harmful' | 'moderate' | 'good';
  name: DictEntry;
  descriptionDictIdx: number;
};
export type Foods = Food[];

export const availableLangs = ['en', 'hu'] as const;
export type Lang = typeof availableLangs[number];
