export { vars } from './generated/vars';
export type { BookdToken } from './generated/vars';

export type BookdTheme = 'light' | 'dark';

/** Apply a Bookd theme to an element (defaults to <html>). */
export function setTheme(theme: BookdTheme, el: HTMLElement = document.documentElement) {
  el.dataset.bookdTheme = theme;
}
