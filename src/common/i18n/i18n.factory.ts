import Polyglot from 'node-polyglot';

import { Context } from '../context';
import { Env } from '../env';
import { loadTranslations } from './helpers';
import { I18n } from './interfaces/I18n';

export const i18nFactory = {
  inject: [Env, Context],
  provide: 'I18n',
  useFactory: (env: Env, ctx: Context): I18n => {
    const messages = env.SUPPORTED_LANGUAGES.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: loadTranslations(locale),
      }),
      {},
    );

    const polyglot = new Polyglot({
      locale: env.DEFAULT_LOCALE,
      phrases: messages[env.DEFAULT_LOCALE],
    });

    return {
      locale() {
        return polyglot.locale();
      },
      setLocale(locale: string): void {
        if (
          Object.keys(messages).includes(locale) &&
          polyglot.locale() !== locale
        ) {
          polyglot.locale(locale);
          ctx.store.set('locale', locale);

          polyglot.extend(messages[locale]);
        }
      },
      translate(phrase: string, variables?: any): string {
        return polyglot.t(phrase, variables);
      },
    };
  },
};
