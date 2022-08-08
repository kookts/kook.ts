import { BaseClient } from '../client/base.js';

export abstract class BaseModel implements KBaseModelRaw {
  client!: BaseClient;
  id!: string;
  [key: string]: unknown;
  constructor(data: KBaseModelRaw, client: BaseClient) {
    Object.assign(this, data);
    this.client = client;
  }
}

export interface KBaseModelRaw {
  id: string;
}
