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
    let guildChannel = super.create(data, client);
    guildChannel.guild = GuildFactory.createById({ id: data.guildId }, client);
    guildChannel.parentId = data.parentId;
    guildChannel.isCategory = data.isCategory;
    if (data.masterId)
      guildChannel.master = GuildUserFactory.createById(
        { id: data.masterId, guildId: data.guildId },
        client
      );

    return guildChannel;
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
