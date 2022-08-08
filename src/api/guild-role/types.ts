export interface KRole {
  /**
   * 角色的id
   */
  roleId: number;
  /**
   * 角色的名称
   */
  name: string;
  /**
   * 角色的色值0x000000 - 0xFFFFFF
   */
  color: number;
  /**
   * 顺序，值越小载靠前
   */
  position: number;
  /**
   * 只能为0或者1，是否把该角色的用户在用户列表排到前面
   */
  hoist: number;
  /**
   * 只能为0或者1，该角色是否可以被提及
   */
  mentionable: number;
  /**
   * 权限,参见[权限说明](#权限说明)
   */
  permissions: number;
}

export type Role = KRole;

export interface KGrantUserRoleResponse {
  /**
   * 用户ID
   */
  user_id: string;
  /**
   * 服务器ID
   */
  guild_id: string;
  /**
   * 用户当前拥有的角色（操作后）
   */
  roles: number[];
}

export interface KRevokeUserRoleResponse {
  /**
   * 用户ID
   */
  user_id: string;
  /**
   * 服务器ID
   */
  guild_id: string;
  /**
   * 用户当前拥有的角色（操作后）
   */
  roles: number[];
}

export interface KRevokeUserRoleResponse {
  /**
   * 用户ID
   */
  user_id: string;
  /**
   * 服务器ID
   */
  guild_id: string;
  /**
   * 角色id的列表
   */
  roles: number[];
}

export interface UserRoleGrantResponseInternal {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 服务器ID
   */
  guildId: string;
  /**
   * 用户当前拥有的角色（操作后）
   */
  roles: number[];
}

export interface UserRoleRevokeResponseInternal {
  /**
   * 用户ID
   */
  userId: string;
  /**
   * 服务器ID
   */
  guildId: string;
  /**
   * 用户当前拥有的角色（操作后）
   */
  roles: number[];
}
