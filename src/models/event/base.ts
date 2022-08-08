import { BaseClient } from "../../client/base.js";
import { KMessageEvent } from "../../client/event-receiver/types.js";
import { BaseChannel } from "../channel/base.js";
import { Guild } from "../guild/index.js";
import { BaseUser } from "../user/base.js";


/**
 * BaseEvent
 *
 * @export
 * @class BaseEvent
 */
export class BaseEvent {
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
  constructor(raw: KMessageEvent, client: BaseClient) {
    this.rawEvent = raw;
    this.client = client;
    this.content = raw.content;
    this.id = raw.msgId;
    this.timestamp = raw.msgTimestamp;
    if (raw.type == 255) {
      // system message
      this.type = 'event.' + raw.type;
      if (raw.channelType == 'GROUP') {
        this.guild = new Guild({ id: raw.targetId }, client);
      }
    } else {
      // message
      this.type = 'message.' + raw.type;
    }
  }
}
