import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Polyglot from 'node-polyglot';
import * as sinon from 'sinon';

import { Context } from '../../context/__mocks__/context.component.mock';
import { Env } from '../../env';
import { i18nFactory } from '../i18n.factory';
import { I18n } from '../interfaces/I18n';

@suite('unit I18n component')
class I18nComponentUnit {
  private i18n: I18n;

  public async before() {
    await this.setupModule();
  }

  @test('translate method should call the t method of polyglot prototype')
  public async translate() {
    const polyglotSpy = sinon.spy(Polyglot.prototype, 't');
    await this.i18n.translate('error.badRequest');
    expect(polyglotSpy.called).to.equal(true);
  }

  @test('setLocale method should call the locale method of polyglot prototype')
  public async setLocale() {
    const spy = sinon.spy(Polyglot.prototype, 'locale');
    await this.i18n.setLocale('fr');
    expect(spy.called).to.equal(true);
    expect(this.i18n.locale()).to.equal('fr');
  }

  @test('if the locale is not in the list setLocale should do nothing')
  public async setLocaleUnknown() {
    await this.i18n.setLocale('de');
    expect(this.i18n.locale()).to.equal('en');
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [Context, Env, i18nFactory],
    }).compile();

    this.i18n = module.get<I18n>('I18n');
  }
}
