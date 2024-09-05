import { BaseClient } from '../../client/index.js';
import { BaseModel } from '../base.js';

export abstract class BaseChannel
  extends BaseModel
  implements BaseChannelInterface
{
  constructor(base: BaseChannelInterface, client: BaseClient) {
    super(base, client);
  }

  // abstract send();
}

export interface BaseChannelInterface {
  id: string;
}
