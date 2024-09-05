import RequestError from '../../models/error/RequestError.js';
import { Guild, GuildFactory, KGuild } from '../../models/index.js';
import { GuildUser } from '../../models/user/guild.js';
import { ApiBase } from '../base.js';
import { KAPIResponse } from '../types.js';
import {
  GuildListResponse,
  GuildUserListResponse,
  GuildViewResponse,
  KGuildListResponse,
  KGuildUserListResponse,
  KGuildViewResponse,
} from './types.js';

export class GuildApi extends ApiBase {
  /**
   * 获取当前用户加入的服务器列表
   * @param page 目标页数
   * @param pageSize 每页数据数量
   * @param sort 代表排序的字段, 比如-id 代表 id 按 DESC 排序, id 代表 id 按 ASC 排序. 不一定有, 如果有, 接口中会声明支持的排序字段.
   */
  async list(
    page: number,
    pageSize: number,
    sort: string
  ): Promise<GuildListResponse> {
    const data = (
      await this.client.get(
        'v3/guild/list',
        this.toParams({
          page,
          pageSize,
          sort,
        })
      )
    ).data as KAPIResponse<KGuildListResponse>;
    if (data.code === 0) {
      return this.toMultipage(data, Guild);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取服务器详情
   * @param guildId 服务器 Id
   */
  async view(guildId: string): Promise<Required<Guild>> {
    const data = (await (
      await this.client.get('v3/guild/view', this.toParams({ guildId }))
    ).data) as KAPIResponse<Required<KGuild>>;

    if (data.code == 0) {
      return GuildFactory.create(data.data, this.client);
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
   * @param filterUserId 获取指定 id 所属用户的信息
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
    pageSize?: number,
    filterUserId?: string
  ): Promise<GuildUserListResponse> {
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
      filterUserId,
    });
    const data = (await this.client.get('v3/guild/user-list', params))
      .data as KAPIResponse<KGuildUserListResponse>;
    if (data.code === 0) {
      return {
        ...this.toMultipage(data, GuildUser),
        offlineCount: data.data.offlineCount,
        onlineCount: data.data.onlineCount,
        userCount: data.data.userCount,
      };
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 修改服务器中用户的昵称
   * @param guildId 服务器的 Id
   * @param nickname 昵称，2 - 64 长度，不传则清空昵称
   * @param userId 要修改昵称的目标用户 Id，不传则修改当前登陆用户的昵称
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

  /**
   * 离开服务器
   * @param guildId 服务器的 Id
   */
  async leave(guildId: string): Promise<boolean> {
    const data = (
      await this.client.post(
        'v3/guild/leave',
        this.toParams({
          guildId,
        })
      )
    ).data as KAPIResponse<never>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 踢出服务器
   * @param guildId 服务器的 Id
   */
  async kickout(guildId: string, targetId: string): Promise<boolean> {
    const data = (
      await this.client.post(
        'v3/guild/kickout',
        this.toParams({
          guildId,
          targetId,
        })
      )
    ).data as KAPIResponse<never>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
