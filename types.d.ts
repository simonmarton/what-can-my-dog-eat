import { Lang } from './models.ts';

export {};

declare global {
  interface Window {
    lang: Lang;
  }
}
