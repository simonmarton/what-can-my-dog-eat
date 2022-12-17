import { PageProps } from '$fresh/server.ts';
import { VNode } from 'preact';

import Page from '../../components/Page.tsx';
import withLangProvider from '../../withLangProvider.tsx';

export default withLangProvider(Page);
