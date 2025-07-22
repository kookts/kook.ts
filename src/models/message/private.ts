import { BaseClient } from '../../client/base.js';
import { BaseModelFactory } from '../base.js';
import { BaseMessage, KBaseMessage } from './base.js';

export class PrivateMessage extends BaseMessage {
  constructor(data: KBaseMessage, client: BaseClient) {
    super(data, client);
  }
}

export class PrivateMessageFactory extends BaseModelFactory(PrivateMessage) {
  static create(data: KBaseMessage, client: BaseClient): PrivateMessage {
    let message = client._cache.message.get(data.id);
    if (!message) {
      message = super.create(data, client);
      client._cache.message.set(data.id, message);
    }
    
    // Update the cached object with new data
    Object.assign(message, data);
    message._initialized = true;
    return message as PrivateMessage;
  }
  
  static createById(id: string, client: BaseClient): PrivateMessage {
    let message = client._cache.message.get(id);
    if (!message) {
      message = super.create({ id } as KBaseMessage, client);
      message._initialized = false;
      client._cache.message.set(id, message);
    }
    return message as PrivateMessage;
  }
}
