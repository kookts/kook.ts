import { BaseClient } from '../client/base.js';
import { BaseModel, KBaseModel } from '../models/base.js';
import { KAPIMultiPage, KAPIResponse } from './types.js';

export class ApiBase {
  protected client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  toMultipage<K extends KAPIMultiPage<KBaseModel>, T extends BaseModel>(
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
