import { Channel } from '../../models/channel/types.js';
import { Guild, GuildUser, KGuild, KGuildUser } from '../../models/index.js';
import { Role } from '../guild-role/types.js';
import { KAPIMultiPage } from '../types.js';

export interface KGuildListResponse extends KAPIMultiPage<Required<KGuild>> {}

export interface GuildListResponse extends KAPIMultiPage<Guild> {}

export type KGuildViewResponse = Required<KGuild>;

export type GuildViewResponse = Required<Guild>;

export interface KGuildUserListResponse extends KAPIMultiPage<KGuildUser> {
  userCount: number;
  onlineCount: number;
  offlineCount: number;
}

export interface GuildUserListResponse extends KAPIMultiPage<GuildUser> {
  userCount: number;
  onlineCount: number;
  offlineCount: number;
}
