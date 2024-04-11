import { BaseEvent } from '../../models/event/base.js';
import { BaseMessage, GuildMessage } from '../../models/message/index.js';
import { PrivateMessage } from '../../models/message/private.js';
import { BaseClient } from '../base.js';
import { KMessageEventRaw } from './types.js';
import { toCamelCase } from '../../utils.js';

export function parsePacket(
  packet: KMessageEventRaw,
  client: BaseClient
): BaseEvent | BaseMessage {
  const data = toCamelCase(packet);
  if (data.type === 255) {
    return new BaseEvent(data, client);
  } else {
    // message should be also one of the event! should be able to get message from event!
    if (data.channelType == 'GROUP') {
      // return new GuildMessage(data, client);
    } else {
      // return new PrivateMessage(data, client);
    }
  }
}
