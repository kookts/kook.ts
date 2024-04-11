import { BaseClient } from '../../client/base.js';
import { GuildChannel } from '../channel/guild.js';
import { Guild } from '../guild/index.js';
import { GuildUser, KGuildUser } from '../user/guild.js';
import { BaseMessage, KBaseMessage } from './base.js';
import { KTextMessageEvent } from './types.js';

export class GuildMessage extends BaseMessage {
  declare readonly channel: GuildChannel;
  declare readonly guild: Guild;
  constructor(data: KGuildMessageInterface, client: BaseClient) {
    super(data, client);
    this.channel = new GuildChannel(
      {
        // TODO! Fix this
        id: (data.extra as any).channelId!,
        name: data.extra.channelName!,
        guildId: data.extra.guildId,
      },
      client
    );
    this.guild = this.channel.guild;
    this.user = new GuildUser(
      {
        ...data.extra.author,
        guildId: data.extra.guildId,
      },
      client
    );
  }
}

interface KGuildMessageInterface extends KBaseMessage {
  extra: {
    guildId: string;
    channelName: string;
    mention: [];
    mentionAll: boolean;
    mentionRoles: [];
    mentionHere: boolean;
    author: KGuildUser;
  };
}
