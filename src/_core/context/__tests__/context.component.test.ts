import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Polyglot from 'node-polyglot';
import * as sinon from 'sinon';

import { Env } from '../../env';
import { Context } from '../context.component';

@suite('unit Context component')
class ContextComponentUnit {
  private ctx: Context;

  public async before() {
    await this.setupModule();
  }

  @test('create method should call createNamespace and the given callback')
  public create() {
    const obj = {
      cb: () => ({}),
    };
    const cbSpy = sinon.spy(obj, 'cb');
    this.ctx.create(obj.cb);
    expect(cbSpy.called).to.equal(true);
  }

  @test('locale should call set method of the context and set the locale prop')
  public locale(done) {
    this.ctx.create(() => {
      const spy = sinon.spy(this.ctx.context, 'set');
      this.ctx.locale = 'fr';
      expect(spy.called).to.equal(true);
      expect(this.ctx.locale).to.equal('fr');
      done();
    });
  }

  @test('response should call set method of the context')
  public response(done) {
    this.ctx.create(() => {
      const spy = sinon.spy(this.ctx.context, 'set');
      this.ctx.response = 'foo';
      expect(spy.called).to.equal(true);
      expect(this.ctx.response).to.equal('foo');
      done();
    });
  }

  private async setupModule() {
    const module = await Test.createTestingModule({
      components: [Context, Env],
    }).compile();

    this.ctx = module.get<Context>(Context);
  }
}
