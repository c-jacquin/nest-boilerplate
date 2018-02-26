import { Component } from '@nestjs/common';
import autobind from 'autobind-decorator';
import * as axios from 'axios';

import { Context } from '../context';
import { Logger } from '../logger';

@Component()
export class Http {
  private static REQUEST_TIMER = 'request-timer';

  constructor(private ctx: Context, private logger: Logger) {
    axios.default.interceptors.response.use(
      this.successInterceptor,
      this.errorInterceptor,
    );

    axios.default.interceptors.request.use(this.requestInterceptor);
  }

  public delete(uri: string, config?: axios.AxiosRequestConfig) {
    return axios.default.delete(uri, config);
  }

  public get(uri: string, config?: axios.AxiosRequestConfig) {
    return axios.default.get(uri, config);
  }

  public post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.post(uri, body, config);
  }

  public put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.put(uri, body, config);
  }

  private getRequestDuration() {
    return Date.now() - this.ctx.store.get(Http.REQUEST_TIMER);
  }

  private formatLogMessage({ message, method, url, status }) {
    return (
      `Http => ${method} ${url} ${status}` +
      (message ? ` - ${message}` : '') +
      ` - ${this.getRequestDuration()}ms`
    );
  }

  @autobind
  private requestInterceptor(config) {
    this.ctx.store.set(Http.REQUEST_TIMER, Date.now());
    return config;
  }

  @autobind
  private successInterceptor(response) {
    this.logger.info(
      this.formatLogMessage({
        message: null,
        method: response.config.method.toUpperCase(),
        status: response.status,
        url: response.url,
      }),
    );
    return response;
  }

  @autobind
  private errorInterceptor(error) {
    return Promise.reject(
      new Error(
        this.formatLogMessage({
          message: error.message,
          method: error.config.method.toUpperCase(),
          status: error.response.status,
          url: error.config.url,
        }),
      ),
    );
  }
}
