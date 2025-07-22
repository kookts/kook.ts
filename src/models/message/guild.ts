import { BaseClient } from '../../client/base.js';
import { BaseModelFactory, KPartialModel } from '../base.js';
import { GuildChannel, GuildChannelFactory } from '../channel/guild.js';
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
    let message = client._cache.message.get(data.id) as GuildMessage;
    if (!message) {
      message = super.create(data, client) as GuildMessage;
      client._cache.message.set(data.id, message);
    }

    // Update the cached object with new data
    Object.assign(message, data);
    message.channel = channel;
    message.guild = message.channel.guild;
    message.user = GuildUserFactory.createById(
      data.author.id,
      message.guild,
      client
    );
    message._initialized = true;
    return message as Required<GuildMessage>;
  }
}

interface KGuildMessageInterface extends KBaseMessage {
  channelId: string;
}

export type KGuildMessage = KPartialModel<KGuildMessageInterface>;
