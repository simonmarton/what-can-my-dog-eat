// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[lang]/[foodId].tsx";
import * as $1 from "./routes/[lang]/index.tsx";
import * as $2 from "./routes/_middleware.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/index.tsx";
import * as $$0 from "./islands/SearchBar.tsx";

const manifest = {
  routes: {
    "./routes/[lang]/[foodId].tsx": $0,
    "./routes/[lang]/index.tsx": $1,
    "./routes/_middleware.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/index.tsx": $4,
  },
  islands: {
    "./islands/SearchBar.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;