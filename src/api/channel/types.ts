import { KGuildChannel, GuildChannel } from "../../models/channel/guild.js";
import { KAPIMultiPage } from "../types.js";


export type KChannelListResponse = KAPIMultiPage<KGuildChannel> & {
  sort: Record<string, never>;
};

export type ChannelListResponse = KAPIMultiPage<GuildChannel> & {
  sort: Record<string, never>;
};
