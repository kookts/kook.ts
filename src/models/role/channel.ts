import { BaseClient } from '../../client/index.js';
import {
  BaseModel,
  BaseModelFactory,
  KBaseInterface,
  KPartialModel,
} from '../base.js';
import { GuildUser, GuildUserFactory, KGuildUser } from '../user/guild.js';
import { GuildFactory } from '../guild/index.js';
import {
  KChannelPermissionOverwrite,
  KChannelPermissionUser,
} from '../../api/channel-role/types.js';

export interface ChannelPermissionUser {
  user: GuildUser;
  allow: number;
  deny: number;
}

export interface ChannelPermissionOverwrite {
  roleId: number;
  allow: number;
  deny: number;
}

export class ChannelRolePermissions extends BaseModel {
  permissionOverwrites: ChannelPermissionOverwrite[];
  permissionUsers: ChannelPermissionUser[];
  permissionSync: boolean;
}

export class ChannelRolePermissionsFactory extends BaseModelFactory(
  ChannelRolePermissions
) {
  public static create(
    data: KChannelRolePermissions,
    client: BaseClient,
    guildId?: string
  ): Required<ChannelRolePermissions> {
    let permissions = super.create(
      { id: data.channelId || 'unknown' },
      client
    ) as ChannelRolePermissions;

    // Create permission users with factory
    permissions.permissionUsers =
      data.permissionUsers?.map((userData) => {
        const guild = guildId ? GuildFactory.createById(guildId, client) : null;
        const permUser: ChannelPermissionUser = {
          user: guild
            ? GuildUserFactory.create(userData.user, client, guild)
            : new GuildUser(userData.user, client),
          allow: userData.allow,
          deny: userData.deny,
        };
        return permUser;
      }) || [];

    // Create permission overwrites
    permissions.permissionOverwrites =
      data.permissionOverwrites?.map((overwriteData) => {
        const overwrite: ChannelPermissionOverwrite = {
          roleId: overwriteData.roleId,
          allow: overwriteData.allow,
          deny: overwriteData.deny,
        };
        return overwrite;
      }) || [];

    permissions.permissionSync = data.permissionSync;
    return permissions as Required<ChannelRolePermissions>;
  }
}

interface KChannelRolePermissionsInterface extends KBaseInterface {
  channelId?: string;
  permissionOverwrites: KChannelPermissionOverwrite[];
  permissionUsers: KChannelPermissionUser[];
  permissionSync: boolean;
}

export type KChannelRolePermissions =
  KPartialModel<KChannelRolePermissionsInterface>;
