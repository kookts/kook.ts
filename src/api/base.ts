import { SnakeCasedPropertiesDeep } from 'type-fest';
import { BaseClient } from '../client/base.js';
import { BaseModel, KBaseInterface } from '../models/base.js';
import { KAPIMultiPage, KAPIResponse } from './types.js';
import decamelizeKeys from 'decamelize-keys';

export class ApiBase {
  protected client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   *
   * @param params to snake params and remove empty keys
   * @returns
   */
  toParams<T = unknown>(params: T): SnakeCasedPropertiesDeep<T> {
    Object.keys(params).forEach((key) =>
      params[key] === undefined ? delete params[key] : {}
    );
    return decamelizeKeys(params, { deep: true, separator: '_' }) as any;
  }

  toMultipage<K extends KAPIMultiPage<KBaseInterface>, T extends BaseModel>(
    data: KAPIResponse<K>,
    clss: new (data: any, client: any) => T
  ): KAPIMultiPage<T> {
    return {
      items: data.data.items.map((d) => new clss(d, this.client)),
      meta: data.data.meta,
      sort: data.data.sort,
    };
  }
}
