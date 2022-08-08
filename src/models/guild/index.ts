import { BaseClient } from '../../client/index.js';
import { BaseModel, KBaseModelRaw } from '../base.js';

export * from './types.js';

export class Guild extends BaseModel {
  constructor(data: KGuildRaw, client: BaseClient) {
    super(data, client);
    this.id = data.id;
  }
}

export interface KGuildRaw extends KBaseModelRaw {}
