import { BaseClient } from '../../client/index.js';
import { Guild } from '../guild/index.js';
import { BaseUser, KBaseUser } from './base.js';

export class GuildUser extends BaseUser {
  nickname?: string;
  guild: Guild;
  constructor(data: KGuildUser, client: BaseClient, guild?: Guild) {
    super(data, client);
    this.nickname = data.nickname;
    if (typeof guild !== 'undefined') {
      this.guild = guild;
    } else {
      this.guild = new Guild({ id: data.guildId }, client);
    }
  }
}

interface KGuildUserInterface extends KBaseUser {
  nickname: string;
  guildId: string;
}
export type KGuildUser = Partial<KGuildUserInterface> &
  Pick<KGuildUserInterface, 'guildId'> &
  KBaseUser;
