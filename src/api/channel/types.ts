import { KGuildChannel, GuildChannel } from '../../models/channel/guild.js';
import { KAPIMultiPage } from '../types.js';

export type KChannelListResponse = KAPIMultiPage<KGuildChannel>;

export type ChannelListResponse = KAPIMultiPage<GuildChannel>;
