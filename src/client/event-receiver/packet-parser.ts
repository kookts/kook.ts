import { BaseEvent } from '../../models/event/base.js';
import { GuildMessage } from '../../models/event/message/index.js';
import { PrivateMessage } from '../../models/event/message/private.js';
import { BaseClient } from '../base.js';
import { KMessageEventRaw } from './types.js';
import { toCamelCase } from '../../utils.js';

export function parsePacket(
  packet: KMessageEventRaw,
  client: BaseClient
): BaseEvent {
  const data = toCamelCase(packet);
  if (data.type === 255) {
    return new BaseEvent(data, client);
  } else {
    // message
    if (data.channelType == 'GROUP') {
      return new GuildMessage(data, client);
    } else {
      return new PrivateMessage(data, client);
    }
  }
}
