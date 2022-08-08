import { BaseClient } from '../../client/index.js';
import { Guild } from '../guild/index.js';
import { BaseUser, KBaseUserData } from './base.js';

export class GuildUser extends BaseUser {
  nickname?: string;
  guild: Guild;
  constructor(data: KGuildUserData, client: BaseClient) {
    super(data, client);
    this.nickname = data.nickname;
    this.guild = new Guild({ id: data.guildId }, client);
  }
}

interface KGuildUser extends KBaseUserData {
  nickname: string;
  guildId: string;
}
export type KGuildUserData = Partial<KGuildUser> &
  Pick<KGuildUser, 'guildId'> &
  KBaseUserData;
