import { HandlerContext } from '$fresh/server.ts';
import { Fzf } from 'https://esm.sh/fzf@0.5.1';

import { parseLang } from '../../utils.ts';
import foods from '../../data/data.json' assert { type: 'json' };
import { availableLangs, Foods, SearchResult } from '../../models.ts';

// 🐰
const fuzzyBunnies = availableLangs.reduce(
  (dict, lang) => ({
    ...dict,
    [lang]: new Fzf(foods, {
      selector: (food) => food.name[lang],
      casing: 'case-insensitive',
    }),
  }),
  {}
);

export const handler = (req: Request, _ctx: HandlerContext): Response => {
  const url = new URL(req.url);
  const q = url.searchParams.get('q'),
    lang = parseLang(url.searchParams.get('lang'));

  if (!q) {
    return new Response();
  }

  // @ts-ignore: hulye tipus
  const found = fuzzyBunnies[lang].find(q).map((f) => f.item) as Foods;

  const top: SearchResult[] = found
    .slice(0, 5)
    .map(({ id, category, name: { [lang]: name } }) => ({ id, category, name }));

  const body = JSON.stringify(top, null, 2);

  return new Response(body);
};
