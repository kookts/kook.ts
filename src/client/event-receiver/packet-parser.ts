import { BaseEvent, BaseEventFactory } from '../../models/event/base.js';
import { BaseMessage, GuildMessage } from '../../models/message/index.js';
import { PrivateMessage } from '../../models/message/private.js';
import { BaseClient } from '../base.js';
import { KMessageEventRaw } from './types.js';
import { toCamelCase } from '../../utils.js';
import { GuildMessageEventFactory } from '../../models/event/message.js';
import { SystemEventFactory } from '../../models/event/system.js';

export function parsePacket(
  packet: KMessageEventRaw,
  client: BaseClient
): BaseEvent | BaseMessage {
  const data = toCamelCase(packet);
  if (data.type === 255) {
    return SystemEventFactory.create(data, client);
  } else {
    // message should be also one of the event! should be able to get message from event!
    if (data.channelType == 'GROUP') {
      return GuildMessageEventFactory.create(data, client);
    } else {
      console.log("private message developing?")
      // return new PrivateMessage(data, client);
    }
  }
}
