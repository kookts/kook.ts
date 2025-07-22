import { BaseClient } from '../../client/base.js';
import { BaseModelFactory } from '../base.js';
import { Guild, GuildFactory, KGuild } from '../guild/index.js';
import { GuildUser, GuildUserFactory } from '../user/guild.js';
import { BaseChannel, BaseChannelInterface } from './base.js';

export class GuildChannel extends BaseChannel implements KGuild {
  guildId: string;
  masterId: string;
  guild: Guild;
  name?: string;
  master?: GuildUser;
  parentId?: string;
  topic?: string;
  isCategory?: boolean;
}

export class GuildChannelFactory extends BaseModelFactory(GuildChannel) {
  public static create(data: KGuildChannel, client: BaseClient): GuildChannel {
    let guildChannel = client._cache.channel.get(data.id);
    if (!guildChannel) {
      guildChannel = super.create(data, client);
      client._cache.channel.set(data.id, guildChannel);
    }

    // Update the cached object with new data
    Object.assign(guildChannel, data);
    guildChannel.guild = GuildFactory.createById(data.guildId, client);
    guildChannel.parentId = data.parentId;
    guildChannel.isCategory = data.isCategory;
    if (data.masterId)
      guildChannel.master = GuildUserFactory.createById(
        data.masterId,
        guildChannel.guild,
        client
      );

    return guildChannel;
  }

  public static createById(id: string, guild: Guild, client: BaseClient) {
    let channel = client._cache.channel.get(id);
    if (!channel) {
      channel = super.create({ id }, client);
      channel.guild = guild;
      client._cache.channel.set(id, channel);
    }
    return channel;
  }
}
interface KGuildChannelInterface extends BaseChannelInterface {
  guildId: string;
  masterId: string;
  parentId: string;
  topic: string;
  name: string;
  isCategory: boolean;
}

export type KGuildChannel = Partial<KGuildChannelInterface> &
  Pick<KGuildChannelInterface, 'guildId'> &
  BaseChannelInterface;

// export interface KChannel {
//   guild_id: string;
//   id: string;
//   is_category: boolean;
//   level: number;
//   limit_amount: number;
//   master_id: string;
//   name: string;
//   parent_id: string;
//   permission_overwrites: { role_id: number; allow: number; deny: number }[];
//   permission_sync: number;
//   permission_users: { user: KUserInGuild; allow: number; deny: number }[];
//   slow_mode: number;
//   topic: string;
//   type: number;
//   user_id: string;
//   server_url: string;
// }
