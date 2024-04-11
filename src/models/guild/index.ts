import { KRole, Role } from '../../api/guild-role/types.js';
import { BaseClient } from '../../client/index.js';
import { BaseModel, KBaseInterface, KPartialModel } from '../base.js';
import { GuildChannel, KGuildChannel } from '../channel/guild.js';
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
  roles?: KRole[];
  channels?: GuildChannel[];
  constructor(data: KGuild, client: BaseClient) {
    super(data, client);
    this.id = data.id;
    try {
      this.channels = data.channels.map(
        (channel) => new GuildChannel(channel, client, this)
      );
      this.initialized = true;
    } catch (error) {}
  }
}

interface KGuildInterface extends KBaseInterface {
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
  Roles: Role[];
  channels: KGuildChannel[];
}

export type KGuild = KPartialModel<KGuildInterface>;
