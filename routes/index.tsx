import { Handler } from '$fresh/server.ts';
export const handler: Handler = () => new Response('', { status: 302, headers: { Location: '/hu' } });
