import { BaseClient } from '../../client/base.js';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { BaseModelFactory } from '../base.js';
import { BaseChannel } from '../channel/base.js';
import { Guild, GuildFactory } from '../guild/index.js';
import { BaseUser } from '../user/base.js';

/**
 * BaseEvent
 *
 * @export
 * @class BaseEvent
 */
export abstract class BaseEvent {
  /**
   * camelCased Raw Event
   *
   * @type {(KMessageEvent | any)}
   * @memberof BaseEvent
   */
  rawEvent: KMessageEvent | any;
  client: BaseClient;
  content: string;
  type: string;
  id: string;
  timestamp: number;
  channel?: BaseChannel;
  guild?: Guild;
  user?: BaseUser;
  constructor() {}
}

export function BaseEventFactory<T extends BaseEvent>(
  constructor: new (...args: any[]) => T
) {
  return class {
    static create(raw: KMessageEvent, client: BaseClient): T {
      let event = new constructor();
      event.rawEvent = raw;
      event.client = client;
      event.content = raw.content;
      event.id = raw.msgId;
      event.timestamp = raw.msgTimestamp;
      if (raw.type == 255) {
        event.type = 'event.' + raw.type;
      } else {
        event.type = 'message.' + raw.type;
      }
      return event;
    }
  };
}

// class BaseEventFactory {
//   static create(raw: KMessageEvent, client: BaseClient): BaseEvent {
//     let event = new BaseEvent();
//     event.rawEvent = raw;
//     event.client = client;
//     event.content = raw.content;
//     event.id = raw.msgId;
//     event.timestamp = raw.msgTimestamp;
//     // if (raw.type == 255) {
//     //   // system message
//     event.type = 'event.' + raw.type;
//     // if (raw.channelType == 'GROUP') {
//     //   event.guild = GuildFactory.createById({ id: raw.extra.guildId }, client);
//     // }
//     // } else {
//     //   // message
//     //   event.type = 'message.' + raw.type;
//     //   if (raw.channelType == 'GROUP') {
//     //     event.guild = GuildFactory.createById(
//     //       { id: raw.extra.guildId },
//     //       client
//     //     );
//     //   }
//     // }
//     return event;
//   }
// }
