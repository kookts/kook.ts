import { KGuildRaw } from '../../models/guild/index.js';
import { GuildUser, KGuildUserData } from '../../models/index.js';
import { KAPIMultiPage } from '../types.js';

export interface KGuildListResponse extends KAPIMultiPage<KGuildRaw> {
  sort: {
    id: number;
  };
}

export interface KGuildUserListResponse extends KAPIMultiPage<KGuildUserData> {
  userCount: number;
  onlineCount: number;
  offlineCount: number;
}

export interface GuildListResponseInternal {
  items: KGuildRaw[];
  meta: {
    page: number;
    pageSize: number;
    pageTotal: number;
    total: number;
  };
}

export interface GuildUserListInternal {
  items: GuildUser[]; // TODO
}
