import { config } from 'https://deno.land/x/dotenv/mod.ts';

import rawFoods from '../data/raw.json' assert { type: 'json' };
import foods from '../data/processed.json' assert { type: 'json' };
import dict from '../data/dict.json' assert { type: 'json' };

// relative to the execution path
const PROCESSED_FILE_PATH = './data/processed.json';
const DICT_FILE_PATH = './data/dict.json';
const DATA_FILE_PATH = './data/data.json';
const { DEEPL_AUTH_KEY } = config();

type RawFood = {
  name: string;
  description: string;
  category: string;
  category_desc: string;
};

type ProcessedFood = {
  name: string;
  description: string;
  category: 'harmful' | 'moderate' | 'good';
};

const uniq = (input: RawFood[]): RawFood[] =>
  input.reduce((output, food) => {
    const getVariants = (name: string) => [name, name.replaceAll(' ', ''), name.replace(/s$/, ''), `${name}s`];
    const variants = getVariants(food.name);

    const duplicate = output.find(({ name }) => variants.includes(name) || getVariants(name).includes(food.name));

    if (!duplicate) {
      return output.concat(food);
    } else if (!duplicate.description && food.description) {
      // replace existing record with improved one
      return [...output.filter(({ name }) => name !== duplicate.name), food];
    }

    return output;
  }, [] as RawFood[]);

const sanitize = (input: RawFood[]): ProcessedFood[] =>
  uniq(input)
    .filter(({ category }) => ['harmful', 'moderate', 'good'].includes(category))
    .map<ProcessedFood>(({ name, description, category }) => ({
      name,
      description,
      category: category as ProcessedFood['category'],
    }));

const translate = async (words: string[], to = 'hu', from = 'en') => {
  const body = JSON.stringify({
    text: words,
    target_lang: to,
    source_lang: from,
  });

  const { translations } = (await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'post',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
      'Content-Type': 'application/json',
    },
    body,
  }).then((resp) => resp.json())) as { translations: { text: string }[] };

  return translations.map(({ text }) => text);
};

// process raw
if (false) {
  // console.log(new Set(rawFoods.map(({ category }) => category)));
  const sanitized = sanitize(rawFoods as RawFood[]);
  console.log('#sanitized', sanitized.length);

  const lang = 'hu';
  const trnaslations = await translate(
    sanitized.map(({ name }) => name),
    lang
  );

  const foods = sanitized.map((food, idx) => ({ ...food, [`translated-${lang}`]: trnaslations[idx] }));
  await Deno.writeTextFile(PROCESSED_FILE_PATH, JSON.stringify(foods, null, 2), { create: true });
}

// create dict
if (false) {
  const descriptions = [...new Set(foods.map(({ description }) => description))]
    .filter((d) => !!d)
    .map((d) => d.replace('Tip: ', ''));

  const descriptionTranslations = await translate(descriptions);

  const dict = {
    descriptions: descriptions.map((en, idx) => ({
      en,
      hu: descriptionTranslations[idx],
    })),
    names: foods.map((f) => ({
      en: f.name,
      hu: f['translated-hu'],
    })),
  };

  await Deno.writeTextFile(DICT_FILE_PATH, JSON.stringify(dict, null, 2), { create: true });
}

// create output
if (true) {
  const data = foods.map(({ name, category, description, 'translated-hu': hu }) => ({
    id: name.replaceAll(' ', '-'),
    category,
    name: {
      en: name,
      hu,
    },
    descriptionDictIdx: dict.descriptions.findIndex(({ en }) => en === description),
  }));

  console.log('tutibiztos? dict.categories updatelve lett azota meg mi');
  // await Deno.writeTextFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), { create: true });
}

// "name": "blackberry",
// "translated-hu": "szeder"

// "name": "dates",
// "translated-hu": "datolya"

console.log('Done!');
