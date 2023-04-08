import { KRole, Role } from '../../api/guild-role/types.js';
import { BaseClient } from '../../client/index.js';
import { BaseModel, KBaseModel } from '../base.js';
import { Channel } from '../channel/types.js';
import { GuildUser } from '../user/index.js';

export * from './types.js';

export class Guild extends BaseModel {
  name?: string;
  topic?: string;
  master?: GuildUser;
  icon?: string;
  notifyType?: number;
  region?: string;
  enableOpen?: boolean;
  openId?: string;
  defaultChannelId?: string;
  welcomeChannelId?: string;
  roles?: [KRole];
  channels?: [Channel];
  constructor(data: KGuild, client: BaseClient) {
    super(data, client);
    this.id = data.id;
  }
}

interface KGuildInterface extends KBaseModel {
  name: string;
  topic: string;
  userId: string;
  icon: string;
  notifyType: number;
  region: string;
  enableOpen: boolean;
  openId: string;
  defaultChannelId: string;
  welcomeChannelId: string;
  Roles: [Role];
  channels: [Channel];
}

export type KGuild = Partial<KGuildInterface> & Pick<KGuildInterface, 'id'>;
