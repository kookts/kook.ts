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
import { RolePermission } from './base.js';
import { ChannelPermissionHelper } from '../../helper/permissions.js';

export interface ChannelPermissionUserOverwrite {
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
  permissionUserOverwrites: ChannelPermissionUserOverwrite[];
  permissionSync: boolean;
  channelId: string;

  /**
   * Add a permission overwrite for a role
   */
  async addRoleOverwrite(
    roleId: number,
    allow: number,
    deny: number
  ): Promise<void> {
    // Call API to create/update the role permission
    await this.client.Api.channelRole.update(
      this.channelId,
      'role_id',
      roleId.toString(),
      allow,
      deny
    );

    // Update local state
    const existingIndex = this.permissionOverwrites.findIndex(
      (overwrite) => overwrite.roleId === roleId
    );

    if (existingIndex !== -1) {
      this.permissionOverwrites[existingIndex] = { roleId, allow, deny };
    } else {
      this.permissionOverwrites.push({ roleId, allow, deny });
    }
  }

  /**
   * Remove a permission overwrite for a role
   */
  async removeRoleOverwrite(roleId: number): Promise<boolean> {
    try {
      // Call API to delete the role permission
      await this.client.Api.channelRole.delete(
        this.channelId,
        'role_id',
        roleId.toString()
      );

      // Update local state
      const index = this.permissionOverwrites.findIndex(
        (overwrite) => overwrite.roleId === roleId
      );

      if (index !== -1) {
        this.permissionOverwrites.splice(index, 1);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get permission overwrite for a specific role
   */
  getRoleOverwrite(roleId: number): ChannelPermissionOverwrite | undefined {
    return this.permissionOverwrites.find(
      (overwrite) => overwrite.roleId === roleId
    );
  }

  /**
   * Add a permission overwrite for a user
   */
  async addUserOverwrite(
    user: GuildUser,
    allow: number,
    deny: number
  ): Promise<void> {
    // Call API to create/update the user permission
    await this.client.Api.channelRole.update(
      this.channelId,
      'user_id',
      user.id,
      allow,
      deny
    );

    // Update local state
    const existingIndex = this.permissionUserOverwrites.findIndex(
      (perm) => perm.user.id === user.id
    );

    if (existingIndex !== -1) {
      this.permissionUserOverwrites[existingIndex] = { user, allow, deny };
    } else {
      this.permissionUserOverwrites.push({ user, allow, deny });
    }
  }

  /**
   * Remove a permission overwrite for a user
   */
  async removeUserOverwrite(userId: string): Promise<boolean> {
    try {
      // Call API to delete the user permission
      await this.client.Api.channelRole.delete(
        this.channelId,
        'user_id',
        userId
      );

      // Update local state
      const index = this.permissionUserOverwrites.findIndex(
        (perm) => perm.user.id === userId
      );

      if (index !== -1) {
        this.permissionUserOverwrites.splice(index, 1);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get permission overwrite for a specific user
   */
  getUserOverwrite(userId: string): ChannelPermissionUserOverwrite | undefined {
    return this.permissionUserOverwrites.find(
      (perm) => perm.user.id === userId
    );
  }

  /**
   * Check if permissions are synced with parent
   */
  isSynced(): boolean {
    return this.permissionSync;
  }

  /**
   * Clear all permission overwrites
   */
  clearRoleOverwrites(): void {
    this.permissionOverwrites = [];
  }

  /**
   * Clear all user permissions
   */
  clearUserPermissions(): void {
    this.permissionUserOverwrites = [];
  }

  /**
   * Clear all permissions
   */
  clearAll(): void {
    this.clearRoleOverwrites();
    this.clearUserPermissions();
  }

  /**
   * Add specific permissions to a role using permission helper
   * @param roleId Role ID to modify
   * @param permissions Permissions to allow for this role
   * @returns Promise<void>
   */
  async addRolePermissions(
    roleId: number,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getRoleOverwrite(roleId);
    const helper = existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();

    helper.addAllow(...permissions);
    return this.addRoleOverwrite(roleId, helper.allowValue, helper.denyValue);
  }

  /**
   * Deny specific permissions for a role using permission helper
   * @param roleId Role ID to modify
   * @param permissions Permissions to deny for this role
   * @returns Promise<void>
   */
  async denyRolePermissions(
    roleId: number,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getRoleOverwrite(roleId);
    const helper = existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();

    helper.addDeny(...permissions);
    return this.addRoleOverwrite(roleId, helper.allowValue, helper.denyValue);
  }

  /**
   * Remove specific permissions from a role (make them neutral)
   * @param roleId Role ID to modify
   * @param permissions Permissions to remove from both allow and deny
   * @returns Promise<void>
   */
  async removeRolePermissions(
    roleId: number,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getRoleOverwrite(roleId);
    if (!existing) return;

    const helper = ChannelPermissionHelper.from(existing.allow, existing.deny);
    helper.remove(...permissions);
    return this.addRoleOverwrite(roleId, helper.allowValue, helper.denyValue);
  }

  /**
   * Add specific permissions to a user using permission helper
   * @param user User to modify
   * @param permissions Permissions to allow for this user
   * @returns Promise<void>
   */
  async addUserPermissions(
    user: GuildUser,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getUserOverwrite(user.id);
    const helper = existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();

    helper.addAllow(...permissions);
    return this.addUserOverwrite(user, helper.allowValue, helper.denyValue);
  }

  /**
   * Deny specific permissions for a user using permission helper
   * @param user User to modify
   * @param permissions Permissions to deny for this user
   * @returns Promise<void>
   */
  async denyUserPermissions(
    user: GuildUser,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getUserOverwrite(user.id);
    const helper = existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();

    helper.addDeny(...permissions);
    return this.addUserOverwrite(user, helper.allowValue, helper.denyValue);
  }

  /**
   * Remove specific permissions from a user (make them neutral)
   * @param userId User ID to modify
   * @param permissions Permissions to remove from both allow and deny
   * @returns Promise<void>
   */
  async removeUserPermissions(
    userId: string,
    ...permissions: (RolePermission | number)[]
  ): Promise<void> {
    const existing = this.getUserOverwrite(userId);
    if (!existing) return;

    const helper = ChannelPermissionHelper.from(existing.allow, existing.deny);
    helper.remove(...permissions);
    return this.addUserOverwrite(
      existing.user,
      helper.allowValue,
      helper.denyValue
    );
  }

  /**
   * Get a permission helper for a role's current permissions
   * @param roleId Role ID to get helper for
   * @returns ChannelPermissionHelper instance
   */
  getRolePermissionHelper(roleId: number): ChannelPermissionHelper {
    const existing = this.getRoleOverwrite(roleId);
    return existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();
  }

  /**
   * Get a permission helper for a user's current permissions
   * @param userId User ID to get helper for
   * @returns ChannelPermissionHelper instance
   */
  getUserPermissionHelper(userId: string): ChannelPermissionHelper {
    const existing = this.getUserOverwrite(userId);
    return existing
      ? ChannelPermissionHelper.from(existing.allow, existing.deny)
      : new ChannelPermissionHelper();
  }

  /**
   * Check if a role has a specific permission (explicitly allowed)
   * @param roleId Role ID to check
   * @param permission Permission to check
   * @returns True if role has the permission explicitly allowed
   */
  roleHasPermission(
    roleId: number,
    permission: RolePermission | number
  ): boolean {
    return this.getRolePermissionHelper(roleId).isAllowed(permission);
  }

  /**
   * Check if a role has a permission denied
   * @param roleId Role ID to check
   * @param permission Permission to check
   * @returns True if role has the permission explicitly denied
   */
  rolePermissionDenied(
    roleId: number,
    permission: RolePermission | number
  ): boolean {
    return this.getRolePermissionHelper(roleId).isDenied(permission);
  }

  /**
   * Check if a user has a specific permission (explicitly allowed)
   * @param userId User ID to check
   * @param permission Permission to check
   * @returns True if user has the permission explicitly allowed
   */
  userHasPermission(
    userId: string,
    permission: RolePermission | number
  ): boolean {
    return this.getUserPermissionHelper(userId).isAllowed(permission);
  }

  /**
   * Check if a user has a permission denied
   * @param userId User ID to check
   * @param permission Permission to check
   * @returns True if user has the permission explicitly denied
   */
  userPermissionDenied(
    userId: string,
    permission: RolePermission | number
  ): boolean {
    return this.getUserPermissionHelper(userId).isDenied(permission);
  }
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

    // Set the channel ID
    permissions.channelId = data.channelId || 'unknown';

    // Create permission users with factory
    permissions.permissionUserOverwrites =
      data.permissionUsers?.map((userData) => {
        const guild = guildId ? GuildFactory.createById(guildId, client) : null;
        const permUser: ChannelPermissionUserOverwrite = {
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
