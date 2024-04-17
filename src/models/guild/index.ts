import { KRole, Role } from '../../api/guild-role/types.js';
import { BaseClient } from '../../client/index.js';
import {
  BaseModel,
  BaseModelFactory,
  KBaseInterface,
  KPartialModel,
} from '../base.js';
import {
  GuildChannel,
  GuildChannelFactory,
  KGuildChannel,
} from '../channel/guild.js';
import {
  BaseUser,
  BaseUserFactory,
  GuildUser,
  GuildUserFactory,
} from '../user/index.js';

export * from './types.js';

export class Guild extends BaseModel implements KGuild {
  userId: string;
  roles: KRole[];
  boostNum: number;
  bufferBoostNum: number;
  level: number;
  masterId: string;
  name?: string;
  topic?: string;
  master?: BaseUser;
  icon?: string;
  notifyType?: number;
  region?: string;
  enableOpen?: boolean;
  openId?: string;
  defaultChannelId?: string;
  welcomeChannelId?: string;
  channels?: GuildChannel[];

  async createChannel(...data: any) {
    return this.client.Api.channel.create(
      this.id,
      data.name,
      data.parentId,
      data.type
    );
  }
  async deleteChannel(channelId: string) {
    return this.client.Api.channel.delete(channelId);
  }
  async kickUser(userId: string) {
    return this.client.Api.guild.kickout(this.id, userId);
  }
  async getUsers() {
    return this.client.Api.guild.userList(this.id);
  }
  async leave() {
    return this.client.Api.guild.leave(this.id);
  }
  async mute(userId, type) {
    return this.client.Api.guildMute.create(this.id, userId, type);
  }
  async unmute(userId, type) {
    return this.client.Api.guildMute.delete(this.id, userId, type);
  }
}

export class GuildFactory extends BaseModelFactory(Guild) {
  static create(data: KGuild, client: BaseClient): Required<Guild> {
    let guild = client._cache.guild.get(data.id);
    if (!guild) guild = super.create(data, client);
    guild.id = data.id;
    guild.channels = data.channels.map((channel) => {
      return new GuildChannel(channel, client);
    });
    guild.master = BaseUserFactory.createById(guild.masterId, client);
    guild._initialized = true;
    return guild as Required<Guild>;
  }
  static createById(data: KGuild, client: BaseClient): Guild {
    let guild = super.create(data, client) as Guild;
    guild.id = data.id;
    guild._initialized = false;
    return guild;
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
  roles: Role[];
  channels: KGuildChannel[];
  boostNum: number;
  bufferBoostNum: number;
  level: number;
  masterId: string;
}

export type KGuild = KPartialModel<KGuildInterface>;
