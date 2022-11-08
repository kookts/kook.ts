import { BaseClient } from '../client/base.js';

export class BaseModel implements KBaseModel {
  client!: BaseClient;
  id!: string;
  [key: string]: unknown;
  constructor(data: KBaseModel, client: BaseClient) {
    Object.assign(this, data);
    this.client = client;
  }
}

export interface KBaseModel {
  id: string;
}
