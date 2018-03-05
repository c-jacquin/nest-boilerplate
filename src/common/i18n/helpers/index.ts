import * as merge from 'deepmerge';
import * as glob from 'glob';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, tap } from 'rxjs/operators';

export const loadTranslations = (locale: string) => {
  const TRANSLATIONS_GLOB = `${process.cwd()}/src/**/translations/${locale}.json`;

  return glob
    .sync(TRANSLATIONS_GLOB)
    .map(require)
    .reduce(merge, {});
};
