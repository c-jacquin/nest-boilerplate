import { Component } from '@nestjs/common';
import * as Polyglot from 'node-polyglot';

import { Context } from '../context';
import { Env } from '../env';
import * as enMessages from './translations/en.json';
import * as frMessages from './translations/fr.json';

@Component()
export class I18n extends Polyglot {
  public static messages = {
    en: enMessages,
    fr: frMessages,
  };

  constructor(env: Env, private ctx: Context) {
    super({
      locale: env.DEFAULT_LOCALE,
      phrases: I18n.messages[env.DEFAULT_LOCALE],
    });
  }

  public setLocale(locale: string): void {
    if (
      Object.keys(I18n.messages).includes(locale) &&
      this.locale() !== locale
    ) {
      this.locale(locale);
      this.ctx.store.set('locale', locale);

      this.extend(I18n.messages[locale]);
    }
  }

  public translate(phrase: string, variables?: any): string {
    return this.t(phrase, variables);
  }
}
