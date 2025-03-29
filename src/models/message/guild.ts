import { BaseClient } from '../../client/base.js';
import { BaseModelFactory, KPartialModel } from '../base.js';
import { GuildChannel } from '../channel/guild.js';
import { Guild } from '../guild/index.js';
import { GuildUser, GuildUserFactory } from '../user/guild.js';
import { BaseMessage, KBaseMessage } from './base.js';

export class GuildMessage extends BaseMessage {
  declare channel: GuildChannel;
  declare guild: Guild;
}
export class GuildMessageFactory extends BaseModelFactory(GuildMessage) {
  public static create(
    data: KGuildMessage,
    client: BaseClient,
    channel: GuildChannel
  ): Required<GuildMessage> {
    let base = super.create(data, client) as GuildMessage;
    base.channel = channel;
    base.guild = base.channel.guild;
    base.user = GuildUserFactory.createById(data.author.id, base.guild, client);
    return base as Required<GuildMessage>;
  }
}

interface KGuildMessageInterface extends KBaseMessage {
  channelId: string;
}

export type KGuildMessage = KPartialModel<KGuildMessageInterface>;
