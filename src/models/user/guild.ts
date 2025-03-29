import { BaseClient } from '../../client/index.js';
import { BaseModelFactory } from '../base.js';
import { Guild, GuildFactory } from '../guild/index.js';
import { BaseUser, KBaseUser } from './base.js';

export class GuildUser extends BaseUser {
  nickname?: string;
  guild: Guild;
}

export class GuildUserFactory extends BaseModelFactory(GuildUser) {
  public static create(
    data: KGuildUser,
    client: BaseClient,
    guild: Guild
  ): Required<GuildUser> {
    let base = super.create(data, client);
    base.guild = guild;
    base.nickname = data.nickname;
    return base as Required<GuildUser>;
  }
  public static createById(
    id: string,
    guild: Guild,
    client: BaseClient,
    data?: KGuildUser
  ): GuildUser {
    let base = super.create({ id, ...data }, client);
    base.guild = guild;
    return base;
  }
}

interface KGuildUserInterface extends KBaseUser {
  nickname: string;
  guildId: string;
}
export type KGuildUser = Partial<KGuildUserInterface> &
  Pick<KGuildUserInterface, 'guildId'> &
  KBaseUser;
