import { KAPIMultiPage } from '../types.js';

export interface KInviteCreateResponse {
  url: string;
}

export type InviteCreateResponse = KInviteCreateResponse;

// export interface InviteListResponse
//   extends KAPIMultiPage<{
//     channel_id: string;
//     guild_id: string;
//     url: string;
//     url_code: string;
//     user: any;
//   }> {
//   sort: Record<string, never>;
// }

export interface KInviteListResponse {
  items: {
    channelId: string;
    guildId: string;
    url: string;
    urlCode: string;
    user: any;
  }[];
  meta: {
    page: number;
    pageTotal: number;
    pageSize: number;
    total: number;
  };
  sort: Record<string, never>;
}

export type InviteListResponse = KInviteListResponse;
