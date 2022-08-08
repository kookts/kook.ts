import { BaseClient } from '../../../client/base.js';
import { KMessageEvent } from '../../../client/event-receiver/types.js';
import { BaseChannel } from '../../channel/base.js';
import { BaseUser } from '../../user/base.js';
import { BaseEvent } from '../base.js';

export abstract class BaseMessage extends BaseEvent {
  declare channel: BaseChannel;
  constructor(raw: KMessageEvent, client: BaseClient) {
    super(raw, client);
    this.user = new BaseUser(raw.extra.author, client);
  }
}
