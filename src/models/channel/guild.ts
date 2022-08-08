import { BaseClient } from "../../client/base.js";
import { Guild } from "../guild/index.js";
import { GuildUser } from "../user/guild.js";
import { BaseChannel, BaseChannelInterface } from "./base.js";


export class GuildChannel extends BaseChannel {
  name?: string;
  guild: Guild;
  master?: GuildUser;
  parentId?: string;
  topic?: string;
  isCategory?: boolean;
  constructor(data: KGuildChannel, client: BaseClient) {
    super(data, client);
    Object.assign(this, data);
    this.guild = new Guild({ id: data.guildId }, client);
    this.parentId = data.parentId;
    this.isCategory = data.isCategory;
    if (data.masterId)
      this.master = new GuildUser(
        { id: data.masterId, guildId: this.guild.id },
        client
      );
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
