import { BaseClient } from '../../client/base.js';
import { BaseMessage, KBaseMessage } from './base.js';

export class PrivateMessage extends BaseMessage {
  constructor(data: KBaseMessage, client: BaseClient) {
    super(data, client);
  }
}
