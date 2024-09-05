import { BaseClient } from '../../client/index.js';
import RequestError from '../../models/error/RequestError.js';
import { KAPIResponse } from '../types.js';
import {
  KGrantUserRoleResponse,
  KRevokeUserRoleResponse,
  KRole,
  Role,
  UserRoleGrantResponseInternal,
  UserRoleRevokeResponseInternal,
} from './types.js';

export class GuildRoleAPI {
  private self: BaseClient;
  constructor(self: BaseClient) {
    this.self = self;
  }

  /**
   * 获取服务器角色列表
   * @param guildId 服务器的id
   */
  async index(guildId: string): Promise<Role[]> {
    const data = (
      await this.self.get('v3/guild-role/index', {
        guild_id: guildId,
      })
    ).data as KAPIResponse<KRole[]>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 创建服务器角色
   * @param name 角色名称
   * @param guildId 服务器id
   * @returns 创建的角色
   */
  async create(guildId: string, name?: string): Promise<Role> {
    const data = (
      await this.self.post('v3/guild-role/create', {
        name,
        guild_id: guildId,
      })
    ).data as KAPIResponse<KRole>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 给用户角色
   *
   * @param {string} guildId 服务器ID
   * @param {string} userId 用户ID
   * @param {string|number} roleId 角色ID
   */
  async grant(
    guildId: string,
    userId: string,
    roleId: string | number
  ): Promise<UserRoleGrantResponseInternal> {
    if (typeof roleId === 'string') roleId = parseInt(roleId);
    const data = (
      await this.self.post('v3/guild-role/grant', {
        guild_id: guildId,
        user_id: userId,
        role_id: roleId,
      })
    ).data as KAPIResponse<KGrantUserRoleResponse>;
    if (data.code === 0) {
      return {
        userId: data.data.user_id,
        guildId: data.data.guild_id,
        roles: data.data.roles,
      } as UserRoleGrantResponseInternal;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 更新服务器角色权限
   * @param role 角色预期修改后的样子
   * @param guildId 服务器id
   * @returns 更新后的角色
   */
  async update(guildId: string, role: Role): Promise<Role> {
    const data = (
      await this.self.post('v3/guild-role/update', {
        guild_id: guildId,
        name: role.name,
        color: role.color,
        role_id: role.roleId,
        hoist: role.roleId,
        mentionable: role.mentionable,
        permissions: role.permissions,
      })
    ).data as KAPIResponse<KRole>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除用户角色
   * @param guildId 服务器id
   * @param userId 用户ID
   * @param roleId 角色ID
   */
  async revoke(
    guildId: string,
    userId: string,
    roleId: string | number
  ): Promise<UserRoleRevokeResponseInternal> {
    if (typeof roleId === 'string') roleId = parseInt(roleId);
    const data = (
      await this.self.post('v3/guild-role/revoke', {
        guild_id: guildId,
        user_id: userId,
        role_id: roleId,
      })
    ).data as KAPIResponse<KRevokeUserRoleResponse>;
    if (data.code === 0) {
      return {
        userId: data.data.user_id,
        guildId: data.data.guild_id,
        roles: data.data.roles,
      } as UserRoleRevokeResponseInternal;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除服务器角色
   * @param guildId 服务器id
   * @param roleId 角色id
   */
  async delete(guildId: string, roleId: string | number): Promise<boolean> {
    const data = (
      await this.self.post('v3/guild-role/delete', {
        guild_id: guildId,
        role_id: roleId,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
