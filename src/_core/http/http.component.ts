import { Component } from '@nestjs/common';
import * as axios from 'axios';
import { Logger } from '../logger/logger.component';

@Component()
export class Http {
  constructor(private logger: Logger) {
    axios.default.interceptors.response.use(
      this.successInterceptor,
      this.errorInterceptor,
    );
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

  private successInterceptor(response) {
    this.logger.info(
      `Http => ${response.config.method.toUpperCase()} ` +
        `${response.config.url} ${response.status}`,
    );
    return response;
  }

  private errorInterceptor(error) {
    this.logger.error(
      `Http => ${error.config.method.toUpperCase()} ` +
        `${error.config.url} ${error.response.status} - ${error.message}`,
    );
    return Promise.reject(error);
  }
}
