import { PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import { Attributes, createElement, FunctionComponent } from 'preact';

import { LangCtx, parseLang } from './utils.ts';

export default (children: FunctionComponent) => (props: PageProps) => {
  const {
    params: { lang: rawLang },
  } = props;

  const lang = parseLang(rawLang);

  return (
    <>
      <Head>
        <script>window.lang = '{lang}'</script>
      </Head>
      <LangCtx.Provider value={lang}>{createElement(children, props as Attributes)}</LangCtx.Provider>
    </>
  );
};
