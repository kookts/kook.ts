import { BaseClient } from "../index.js";
import { AssetAPI } from "./asset/api.js";
import { ChannelRoleAPI } from "./channel-role/api.js";
import { ChannelAPI } from "./channel/api.js";
import { DirectMessageAPI } from "./direct-message/api.js";
import { GatewayAPI } from "./gateway/api.js";
import { GuildMuteAPI } from "./guild-mute/api.js";
import { GuildRoleAPI } from "./guild-role/api.js";
import { GuildApi } from "./guild/api.js";
import { IntimacyAPI } from "./intimacy/api.js";
import { InviteAPI } from "./invite/api.js";
import { MessageAPI } from "./message/api.js";
import { UserChatAPI } from "./user-chat/api.js";
import { UserAPI } from "./user/api.js";


export class Api {
  guild: GuildApi;
  guildMute: GuildMuteAPI;
  channel: ChannelAPI;
  channelRole: ChannelRoleAPI;
  gateway: GatewayAPI;
  user: UserAPI;
  userChat: UserChatAPI;
  message: MessageAPI;
  asset: AssetAPI;
  guildRole: GuildRoleAPI;
  intimacy: IntimacyAPI;
  directMessage: DirectMessageAPI;
  invite: InviteAPI;
  constructor(self: BaseClient) {
    this.guild = new GuildApi(self);
    this.guildMute = new GuildMuteAPI(self);
    this.channelRole = new ChannelRoleAPI(self);
    this.gateway = new GatewayAPI(self);
    this.user = new UserAPI(self);
    this.userChat = new UserChatAPI(self);
    this.message = new MessageAPI(self);
    this.asset = new AssetAPI(self);
    this.guildRole = new GuildRoleAPI(self);
    this.intimacy = new IntimacyAPI(self);
    this.directMessage = new DirectMessageAPI(self);
    this.channel = new ChannelAPI(self);
    this.invite = new InviteAPI(self);
  }
}
