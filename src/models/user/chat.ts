import { BaseClient } from '../../client/index.js';
import { BaseModelFactory } from '../base.js';
import { BaseModel, KBaseInterface } from '../base.js';
import { BaseUser, BaseUserFactory } from './base.js';

/**
 * A private chat session between the current user and a target user.
 */
export class UserChatSession
  extends BaseModel
  implements KUserChatSessionInternal
{
  code: string; // duplicate of id for clarity
  lastReadTime: number;
  latestMsgTime: number;
  unreadCount: number;
  isFriend?: boolean;
  isBlocked?: boolean;
  isTargetBlocked?: boolean;
  target?: BaseUser; // mapped from targetInfo
  constructor(data: KUserChatSessionInternal, client: BaseClient) {
    super(data, client);
    this.code = data.code;
    this.lastReadTime = data.lastReadTime;
    this.latestMsgTime = data.latestMsgTime;
    this.unreadCount = data.unreadCount;
    this.isFriend = data.isFriend;
    this.isBlocked = data.isBlocked;
    this.isTargetBlocked = data.isTargetBlocked;
    this.target = data.target;
  }
}

export class UserChatSessionFactory extends BaseModelFactory(UserChatSession) {
  public static create(
    data: any,
    client: BaseClient
  ): Required<UserChatSession> {
    const raw: KUserChatSession = data;
    const base = super.create(
      {
        id: raw.code,
        code: raw.code,
        lastReadTime: raw.lastReadTime,
        latestMsgTime: raw.latestMsgTime,
        unreadCount: raw.unreadCount,
      } as any,
      client
    ) as UserChatSession;
    if (raw.isFriend !== undefined) base.isFriend = raw.isFriend;
    if (raw.isBlocked !== undefined) base.isBlocked = raw.isBlocked;
    if (raw.isTargetBlocked !== undefined)
      base.isTargetBlocked = raw.isTargetBlocked;
    if (raw.targetInfo) {
      base.target = BaseUserFactory.create(
        { id: raw.targetInfo.id, ...raw.targetInfo },
        client
      );
    }
    return base as Required<UserChatSession>;
  }
}

interface KUserChatSessionInternal extends KBaseInterface {
  code: string;
  lastReadTime: number;
  latestMsgTime: number;
  unreadCount: number;
  isFriend?: boolean;
  isBlocked?: boolean;
  isTargetBlocked?: boolean;
  target?: BaseUser;
}

// Raw API type (already exists under api/user-chat/types.ts) re-declared minimal for factory typing
export interface KUserChatSession {
  code: string;
  lastReadTime: number;
  latestMsgTime: number;
  unreadCount: number;
  isFriend?: boolean;
  isBlocked?: boolean;
  isTargetBlocked?: boolean;
  targetInfo: {
    id: string;
    username: string;
    online: boolean;
    avatar: string;
  };
}
