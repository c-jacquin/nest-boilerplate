import { Component } from '@nestjs/common';
import * as Polyglot from 'node-polyglot';

import { Context } from '../context';
import { Env } from '../env';
import { loadTranslations } from './helpers';

/* TODO move this in the constructo if typescript finaly authorize code before super */
const messages = new Env().SUPPORTED_LANGUAGES.reduce(
  (acc, locale) => ({
    ...acc,
    [locale]: loadTranslations(locale),
  }),
  {},
);

@Component()
export class I18n extends Polyglot {
  constructor(env: Env, private ctx: Context) {
    super({
      locale: env.DEFAULT_LOCALE,
      phrases: messages[env.DEFAULT_LOCALE],
    });
  }

  public setLocale(locale: string): void {
    if (Object.keys(messages).includes(locale) && this.locale() !== locale) {
      this.locale(locale);
      this.ctx.store.set('locale', locale);

      this.extend(messages[locale]);
    }
  }

  public translate(phrase: string, variables?: any): string {
    return this.t(phrase, variables);
  }
}
