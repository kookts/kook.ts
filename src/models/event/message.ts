import { BaseClient } from '../../client/base.js';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { GuildChannel, GuildChannelFactory } from '../channel/guild.js';
import { Guild, GuildFactory } from '../guild/index.js';
import { KBaseMessage } from '../message/base.js';
import {
  GuildMessage,
  GuildMessageFactory,
  KGuildMessage,
} from '../message/guild.js';
import { GuildUser, GuildUserFactory } from '../user/guild.js';
import { BaseEvent, BaseEventFactory } from './base.js';

export class GuildMessageEvent extends BaseEvent {
  declare channel: GuildChannel;
  declare guild: Guild;
  declare user: GuildUser;
  message: GuildMessage;
}

export class GuildMessageEventFactory extends BaseEventFactory(
  GuildMessageEvent
) {
  static create(raw: KMessageEvent, client: BaseClient) {
    let event = super.create(raw, client);

    event.guild = GuildFactory.createById(raw.extra.guildId, client);
    event.channel = GuildChannelFactory.createById(
      raw.targetId,
      event.guild,
      client
    );
    event.user = GuildUserFactory.createById(
      raw.extra.author.id,
      event.guild,
      client
    );
    let data = raw.extra as KGuildMessage;
    event.message = GuildMessageFactory.create(data, client, event.channel);

    if (raw.channelType == 'GROUP') {
      event.guild = GuildFactory.createById(raw.extra.guildId, client);
      event.channel = GuildChannelFactory.create(
        {
          id: raw.targetId,
          name: raw.extra.channelName!,
          guildId: raw.extra.guildId,
        },
        client
      );
    }

    return event;
  }
}
