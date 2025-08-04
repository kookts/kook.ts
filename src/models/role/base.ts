import { BaseClient } from '../../client/index.js';
import {
  BaseModel,
  BaseModelFactory,
  KBaseInterface,
  KPartialModel,
} from '../base.js';
import { KRole } from '../../api/guild-role/types.js';
import { Guild } from '../guild/index.js';

/**
 * Role permission bit flags enum
 * Based on KOOK's permission system documentation
 */
export enum RolePermission {
  /** 管理员 - 拥有此权限会获得完整的管理权，包括绕开所有其他权限（包括频道权限）限制，属于危险权限 */
  ADMINISTRATOR = 1 << 0, // 1

  /** 管理服务器 - 拥有此权限的成员可以修改服务器名称和更换区域 */
  MANAGE_GUILD = 1 << 1, // 2

  /** 查看管理日志 - 拥有此权限的成员可以查看服务器的管理日志 */
  VIEW_AUDIT_LOG = 1 << 2, // 4

  /** 创建服务器邀请 - 能否创建服务器邀请链接 */
  CREATE_INVITE = 1 << 3, // 8

  /** 管理邀请 - 拥有该权限可以管理服务器的邀请 */
  MANAGE_INVITES = 1 << 4, // 16

  /** 频道管理 - 拥有此权限的成员可以创建新的频道以及编辑或删除已存在的频道 */
  MANAGE_CHANNELS = 1 << 5, // 32

  /** 踢出用户 */
  KICK_MEMBERS = 1 << 6, // 64

  /** 封禁用户 */
  BAN_MEMBERS = 1 << 7, // 128

  /** 管理自定义表情 */
  MANAGE_EMOJIS = 1 << 8, // 256

  /** 修改服务器昵称 - 拥有此权限的用户可以更改他们的昵称 */
  CHANGE_NICKNAME = 1 << 9, // 512

  /** 管理角色权限 - 拥有此权限成员可以创建新的角色和编辑删除低于该角色的身份 */
  MANAGE_ROLES = 1 << 10, // 1024

  /** 查看文字、语音频道 */
  VIEW_CHANNELS = 1 << 11, // 2048

  /** 发布消息 */
  SEND_MESSAGES = 1 << 12, // 4096

  /** 管理消息 - 拥有此权限的成员可以删除其他成员发出的消息和置顶消息 */
  MANAGE_MESSAGES = 1 << 13, // 8192

  /** 上传文件 */
  ATTACH_FILES = 1 << 14, // 16384

  /** 语音链接 */
  CONNECT = 1 << 15, // 32768

  /** 语音管理 - 拥有此权限的成员可以把其他成员移动和踢出频道；但此类移动仅限于在该成员和被移动成员均有权限的频道之间进行 */
  MANAGE_VOICE = 1 << 16, // 65536

  /** 提及@全体成员 - 拥有此权限的成员可使用@全体成员以提及该频道中所有成员 */
  MENTION_EVERYONE = 1 << 17, // 131072

  /** 添加反应 - 拥有此权限的成员可以对消息添加新的反应 */
  ADD_REACTIONS = 1 << 18, // 262144

  /** 跟随添加反应 - 拥有此权限的成员可以跟随使用已经添加的反应 */
  FOLLOW_ADD_REACTIONS = 1 << 19, // 524288

  /** 被动连接语音频道 - 拥有此限制的成员无法主动连接语音频道，只能在被动邀请或被人移动时，才可以进入语音频道 */
  PASSIVE_CONNECT = 1 << 20, // 1048576

  /** 仅使用按键说话 - 拥有此限制的成员加入语音频道后，只能使用按键说话 */
  ONLY_PUSH_TO_TALK = 1 << 21, // 2097152

  /** 使用自由麦 - 没有此权限的成员，必须在频道内使用按键说话 */
  USE_VAD = 1 << 22, // 4194304

  /** 说话 */
  SPEAK = 1 << 23, // 8388608

  /** 服务器静音 */
  DEAFEN_MEMBERS = 1 << 24, // 16777216

  /** 服务器闭麦 */
  MUTE_MEMBERS = 1 << 25, // 33554432

  /** 修改他人昵称 - 拥有此权限的用户可以更改他人的昵称 */
  MANAGE_NICKNAMES = 1 << 26, // 67108864

  /** 播放伴奏 - 拥有此权限的成员可在语音频道中播放音乐伴奏 */
  PLAY_BGM = 1 << 27, // 134217728

  /** 屏幕分享 - 拥有此权限的成员可在频道中向别人分享自己的屏幕 */
  SHARE_SCREEN = 1 << 28, // 268435456

  /** 回复帖子 - 拥有此权限的成员可以在此贴子频道回复帖子 */
  REPLY_POSTS = 1 << 29, // 536870912

  /** 开启录音 - 拥有此权限的成员可在频道中开启录音 */
  RECORDING = 1 << 30, // 1073741824
}

export class Role extends BaseModel implements KRole {
  roleId: number;
  name: string;
  color: number;
  position: number;
  hoist: number;
  mentionable: number;
  permissions: number;
  desc?: string;
  colorMap?: Record<string, any>;
  colorType?: number;
  opPermissions?: number;
  type?: number;
  guild: Guild;

  /**
   * Check if this role has a specific permission
   * @param permission The permission to check (can use RolePermission enum)
   * @returns True if the role has the permission
   *
   * @example
   * ```typescript
   * // Check if role can manage channels
   * if (role.hasPermission(RolePermission.MANAGE_CHANNELS)) {
   *   console.log('Role can manage channels');
   * }
   *
   * // Check using raw number
   * if (role.hasPermission(32)) {
   *   console.log('Role can manage channels');
   * }
   * ```
   */
  hasPermission(permission: RolePermission | number): boolean {
    return (this.permissions & permission) === permission;
  }

  /**
   * Check if this role has multiple permissions (all must be present)
   * @param permissions Array of permissions to check
   * @returns True if the role has all the permissions
   */
  hasAllPermissions(...permissions: (RolePermission | number)[]): boolean {
    const combinedPermissions = permissions.reduce(
      (acc, perm) => acc | perm,
      0
    );
    return (this.permissions & combinedPermissions) === combinedPermissions;
  }

  /**
   * Check if this role has any of the given permissions
   * @param permissions Array of permissions to check
   * @returns True if the role has at least one of the permissions
   */
  hasAnyPermission(...permissions: (RolePermission | number)[]): boolean {
    return permissions.some((permission) => this.hasPermission(permission));
  }

  /**
   * Get a list of all permissions this role has
   * @returns Array of RolePermission enum values that this role has
   */
  listPermissions(): RolePermission[] {
    const permissions: RolePermission[] = [];
    for (const permission of Object.values(RolePermission)) {
      if (typeof permission === 'number' && this.hasPermission(permission)) {
        permissions.push(permission);
      }
    }
    return permissions;
  }

  /**
   * Check if this role is an administrator (has the dangerous admin permission)
   * @returns True if the role has administrator permission
   */
  isAdministrator(): boolean {
    return this.hasPermission(RolePermission.ADMINISTRATOR);
  }

  /**
   * Update this role
   * @returns Promise of the updated role
   */
  async update(): Promise<Required<Role>> {
    return this.client.Api.guildRole.update(this.guild.id, this);
  }

  /**
   * Grant specific permissions to this role
   * @param permissions The permissions to grant (can use RolePermission enum or numbers)
   * @returns Promise of the updated role with new permissions
   */
  async grantPermissions(
    ...permissions: (RolePermission | number)[]
  ): Promise<Required<Role>> {
    // Add the new permissions using bitwise OR
    for (const permission of permissions) {
      this.permissions |= permission;
    }
    return this.update();
  }

  /**
   * Revoke specific permissions from this role
   * @param permissions The permissions to revoke (can use RolePermission enum or numbers)
   * @returns Promise of the updated role with permissions removed
   */
  async revokePermissions(
    ...permissions: (RolePermission | number)[]
  ): Promise<Required<Role>> {
    // Remove the permissions using bitwise AND with NOT
    for (const permission of permissions) {
      this.permissions &= ~permission;
    }
    return this.update();
  }

  /**
   * Set the role permissions to exactly match the provided permissions
   * @param permissions The permissions to set (can use RolePermission enum or numbers)
   * @returns Promise of the updated role with new permissions
   */
  async setPermissions(
    ...permissions: (RolePermission | number)[]
  ): Promise<Required<Role>> {
    // Calculate the combined permissions using bitwise OR
    this.permissions = permissions.reduce((acc, perm) => acc | perm, 0);
    return this.update();
  }

  /**
   * Grant a single permission to this role
   * @param permission The permission to grant
   * @returns Promise of the updated role
   */
  async grantPermission(
    permission: RolePermission | number
  ): Promise<Required<Role>> {
    return this.grantPermissions(permission);
  }

  /**
   * Revoke a single permission from this role
   * @param permission The permission to revoke
   * @returns Promise of the updated role
   */
  async revokePermission(
    permission: RolePermission | number
  ): Promise<Required<Role>> {
    return this.revokePermissions(permission);
  }

  /**
   * Delete this role
   * @returns Promise indicating success
   */
  async delete(): Promise<boolean> {
    return this.client.Api.guildRole.delete(this.guild.id, this.roleId);
  }

  /**
   * Grant this role to a user
   * @param userId The ID of the user to grant this role to
   * @returns Promise with the grant response containing updated user roles
   */
  async grantToUser(userId: string): Promise<{
    userId: string;
    guildId: string;
    roles: number[];
  }> {
    return this.client.Api.guildRole.grant(this.guild.id, userId, this.roleId);
  }

  /**
   * Revoke this role from a user
   * @param userId The ID of the user to revoke this role from
   * @returns Promise with the revoke response containing updated user roles
   */
  async revokeFromUser(userId: string): Promise<{
    userId: string;
    guildId: string;
    roles: number[];
  }> {
    return this.client.Api.guildRole.revoke(this.guild.id, userId, this.roleId);
  }
}

export class RoleFactory extends BaseModelFactory(Role) {
  public static create(
    data: KRole,
    client: BaseClient,
    guild: Guild
  ): Required<Role> {
    // Create role with roleId as the id for BaseModel compatibility
    let role = super.create({ id: data.roleId.toString() }, client) as Role;
    Object.assign(role, data);
    role.roleId = data.roleId;
    role.name = data.name;
    role.color = data.color;
    role.position = data.position;
    role.hoist = data.hoist;
    role.mentionable = data.mentionable;
    role.permissions = data.permissions;
    role.guild = guild;
    return role as Required<Role>;
  }

  public static createById(
    roleId: number,
    client: BaseClient,
    guild: Guild,
    data?: Partial<KRole>
  ): Role {
    let role = super.create({ id: roleId.toString() }, client) as Role;
    if (data) Object.assign(role, data);
    role.roleId = roleId;
    role.guild = guild;
    return role;
  }
}

export { KRole };
