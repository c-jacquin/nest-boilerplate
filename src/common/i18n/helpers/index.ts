import * as merge from 'deepmerge';
import * as glob from 'glob';

export const loadTranslations = (locale: string) => {
  const TRANSLATIONS_GLOB = `${process.cwd()}/src/**/translations/${locale}.json`;

  return glob
    .sync(TRANSLATIONS_GLOB)
    .map(require)
    .reduce(merge, {});
};
