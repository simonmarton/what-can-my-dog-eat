import { PageProps } from '$fresh/server.ts';
import { FunctionComponent } from 'preact';
import { tw } from 'twind';
import IconAlertTriangle from '@icons/alert-triangle.tsx';
import IconAlertOctagon from '@icons/alert-octagon.tsx';
import IconThumbUp from '@icons/thumb-up.tsx';

import foods from '../../data/data.json' assert { type: 'json' };
import dict from '../../data/dict.json' assert { type: 'json' };

import Page from '../../components/Page.tsx';
import { Food } from '../../models.ts';
import { capitalize, parseLang } from '../../utils.ts';

import withLangProvider from '../../withLangProvider.tsx';

const Details = ({ params: { lang: rawLang, foodId } }: PageProps) => {
  const lang = parseLang(rawLang);
  const food = foods.find(({ id }) => id === foodId) as Food;

  if (!food) return <h1>food not found</h1>;

  const description = food.descriptionDictIdx > -1 && dict.descriptions[food.descriptionDictIdx][lang];
  const {
    category,
    name: { [lang]: name },
  } = food;

  const categoryName = dict.categories[category][lang];

  return (
    <Page>
      <div className="flex flex-col items-center xl:items-start gap-4">
        <h1 class="text-4xl">{capitalize(name)}</h1>
        <div
          class={tw('flex flex-col gap-2 rounded-lg flex-shrink text-gray-800 border(gray-800 1) p-4', {
            'bg-green-500': category === 'good',
            'bg-yellow-500': category === 'moderate',
            'bg-red-400': category === 'harmful',
          })}
        >
          <h1 class="flex gap-2 text-2xl">
            {category === 'good' && <IconThumbUp class="w-8 h-8" />}
            {category === 'moderate' && <IconAlertTriangle class="w-8 h-8" />}
            {category === 'harmful' && <IconAlertOctagon class="w-8 h-8" />}
            {categoryName}
          </h1>
          {description}
        </div>
      </div>
    </Page>
  );
};

export default withLangProvider(Details as unknown as FunctionComponent);
