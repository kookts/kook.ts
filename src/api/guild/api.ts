import { BaseClient } from '../../client/base.js';
import RequestError from '../../models/error/RequestError.js';
import { Guild } from '../../models/index.js';
import { GuildUser } from '../../models/user/guild.js';
import { ApiBase } from '../base.js';
import { KAPIResponse } from '../types.js';
import {
  GuildListResponse,
  GuildUserListInternal,
  GuildViewResponse,
  KGuildListResponse,
  KGuildUserListResponse,
  KGuildViewResponse,
} from './types.js';

export class GuildApi extends ApiBase {
  /**
   * 获取当前用户加入的服务器列表
   */
  async list(): Promise<GuildListResponse> {
    const data = (await this.client.get('v3/guild/list', {}))
      .data as KAPIResponse<KGuildListResponse>;
    if (data.code === 0) {
      return this.toMultipage(data, Guild);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async view(guildId: string): Promise<GuildViewResponse> {
    const data = (await (
      await this.client.get('v3/guild/view', { guildId })
    ).data) as KAPIResponse<KGuildViewResponse>;

    if (data.code == 0) {
      return new Guild(data.data, this.client) as Required<Guild>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取服务器中的用户列表
   * @param guildId 服务器 Id
   * @param channelId 频道 Id
   * @param search 搜索关键字，在用户名或昵称中搜索
   * @param roleId 角色 ID，获取特定角色的用户列表
   * @param mobileVerified 只能为`0`或`1`，`0`是未认证，`1`是已认证
   * @param activeTime 根据活跃时间排序，`0`是顺序排列，`1`是倒序排列
   * @param joinedAt 根据加入时间排序，`0`是顺序排列，`1`是倒序排列
   * @param page 目标页
   * @param pageSize 每页数据数量
   * @return 用户列表
   */
  async userList(
    guildId: string,
    channelId?: string,
    search?: string,
    roleId?: number,
    mobileVerified?: boolean,
    activeTime?: boolean,
    joinedAt?: boolean,
    page?: number,
    pageSize?: number
  ): Promise<GuildUserListInternal> {
    const params = this.toParams({
      guildId,
      channelId,
      search,
      roleId,
      mobileVerified,
      activeTime,
      joinedAt,
      page,
      pageSize,
    });
    const data = (await this.client.get('v3/guild/user-list', params))
      .data as KAPIResponse<KGuildUserListResponse>;
    if (data.code === 0) {
      return {
        items: data.data.items.map((e) => {
          return new GuildUser(e, this.client);
        }),
      };
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 修改服务器中用户的昵称
   * @param guildId 服务器的 ID
   * @param userId 要修改昵称的目标用户 ID，不传则修改当前登陆用户的昵称
   * @param nickname 昵称，2 - 64 长度，不传则清空昵称
   */
  async nickname(
    guildId: string,
    nickname?: string,
    userId?: string
  ): Promise<boolean> {
    const data = (
      await this.client.post(
        'v3/guild/nickname',
        this.toParams({ guildId, nickname, userId })
      )
    ).data as KAPIResponse<never>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async leave(guildId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/guild/leave', {
        guild_id: guildId,
      })
    ).data as KAPIResponse<never>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async kickout(guildId: string, targetId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/guild/kickout', {
        guild_id: guildId,
        target_id: targetId,
      })
    ).data as KAPIResponse<never>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
