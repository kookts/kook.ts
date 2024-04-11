import { BaseClient } from '../../client/base.js';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { GuildChannel } from '../channel/guild.js';
import { Guild } from '../guild/index.js';
import { KBaseMessage } from '../message/base.js';
import { GuildMessage } from '../message/guild.js';
import { GuildUser } from '../user/guild.js';
import { BaseEvent } from './base.js';

export class GuildMessageEvent extends BaseEvent {
  declare channel: GuildChannel;
  declare guild: Guild;
  declare user: GuildUser;
  message: GuildMessage;
  constructor(raw: KMessageEvent, client: BaseClient) {
    super(raw, client);
    this.channel = new GuildChannel(
      {
        id: raw.targetId,
        name: raw.extra.channelName!,
        guildId: raw.extra.guildId,
      },
      client
    );
    this.guild = this.channel.guild;
    this.user = new GuildUser(
      {
        ...raw.extra.author,
        guildId: raw.extra.guildId,
      },
      client
    );
    let data = raw.extra.msg as KBaseMessage;
    data.id = raw.msgId;
    // data.targetId = raw.targetId;
    // this.message = new GuildMessage(data, client);
  }
}
