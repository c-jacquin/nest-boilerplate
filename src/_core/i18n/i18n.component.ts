import { Component } from '@nestjs/common';
import * as Polyglot from 'node-polyglot';

import { Env } from '../env';
import * as enMessages from './translations/en.json';
import * as frMessages from './translations/fr.json';

@Component()
export class I18n extends Polyglot {
  public static messages = {
    en: enMessages,
    fr: frMessages,
  };

  constructor(env: Env) {
    super({
      locale: env.DEFAULT_LOCALE,
      phrases: I18n.messages[env.DEFAULT_LOCALE],
    });
  }

  public setLocale(locale: string): void {
    this.locale(locale);

    this.extend(I18n.messages[locale]);
  }

  public translate(phrase: string, variables?: any): string {
    return this.t(phrase, variables);
  }
}
