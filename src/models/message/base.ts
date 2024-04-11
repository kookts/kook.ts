import { BaseClient } from '../../client/base.js';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { BaseChannel } from '../channel/base.js';
import { BaseUser, KBaseUser } from '../user/base.js';
import { BaseEvent } from '../event/base.js';
import { BaseModel, KBaseInterface, KPartialModel } from '../base.js';

export abstract class BaseMessage extends BaseModel {
  type: number;
  author?: BaseUser;
  content?: string;
  mention?: string[];
  mentionAll?: boolean;
  mentionRoles?: number[];
  mentionHere?: boolean;
  embeds?: any[];
  attachments?: {
    type: string;
    name: string;
    url: string;
  };
  reactions?: any[];
  quote?: any;
  mentionInfo?: {
    mentionPart: any[];
    mentionRolePart: any[];
  };

  // declare channel: BaseChannel;
  constructor(data: KBaseMessage, client: BaseClient) {
    super(data, client);
    this.user = new BaseUser(data.author, client);
  }
}

interface KBaseMessageInterface extends KBaseInterface {
  type: number;
  author: KBaseUser;
  content: string;
  mention: string[];
  mentionAll: boolean;
  mentionRoles: number[];
  mentionHere: boolean;
  embeds: any[];
  attachments: {
    type: string;
    name: string;
    url: string;
  };
  reactions: any[];
  quote: any;
  mentionInfo: {
    mentionPart: any[];
    mentionRolePart: any[];
  };
}

export type KBaseMessage = KPartialModel<KBaseMessageInterface>;

// export abstract class BaseMessage extends BaseEvent {
//   declare channel: BaseChannel;
//   constructor(raw: KMessageEvent, client: BaseClient) {
//     super(raw, client);
//     this.user = new BaseUser(raw.extra.author, client);
//   }
// }
