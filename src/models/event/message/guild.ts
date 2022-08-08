import { BaseClient } from "../../../client/base.js";
import { GuildChannel } from "../../channel/guild.js";
import { Guild } from "../../guild/index.js";
import { GuildUser } from "../../user/guild.js";
import { BaseMessage } from "./base.js";
import { KTextMessageEvent } from "./types.js";


export class GuildMessage extends BaseMessage {
  declare readonly channel: GuildChannel;
  declare readonly guild: Guild;
  constructor(raw: KTextMessageEvent, client: BaseClient) {
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
  }
}
