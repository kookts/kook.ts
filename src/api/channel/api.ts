import { GuildChannel, KGuildChannel } from '../../models/channel/guild.js';
import { GuildUser, KGuildUserData } from '../../models/user';
import RequestError from '../../models/error/RequestError.js';
import { ApiBase } from '../base.js';
import { KAPIResponse } from '../types.js';
import { ChannelListResponse, KChannelListResponse } from './types.js';

export class ChannelAPI extends ApiBase {
  /**
   * 获取频道列表
   * @param guildId 服务器id
   */
  async list(guildId: string): Promise<ChannelListResponse> {
    const data = (
      await this.client.get('v3/channel/list', {
        guild_id: guildId,
      })
    ).data as KAPIResponse<KChannelListResponse>;
    if (data.code === 0) {
      return this.toMultipage(data, GuildChannel);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 获取频道详情
  * @param guildId 服务器id
  * @param needChildren 是否需要获取子频道。默认为false
  */
  async view(channelId: string, needChildren = false): Promise<Required<GuildChannel>> {
    const data = (
      await this.client.get('v3/channel/view', {
        target_id: channelId,
        need_children: needChildren,
      })
    ).data as KAPIResponse<KGuildChannel>;
    if (data.code === 0) {
      return new GuildChannel(data.data, this.client) as Required<GuildChannel>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 创建频道
  * @param guildId 服务器id
  * @param name 频道名称
  * @param parentId 父分组id
  * @param type 频道类型:1 文字, 2 语音, 默认为 1
  * @param limitAmount 语音频道人数限制, 最大99
  * @param voiceQuality 语音音质, 默认为2. 1流畅, 2正常, 3高质量
  * @param isCategory 是否是分组，默认为 0: 1 是, 0 否. 当该值传 1 时，只接收 guild_id、name、is_category 三个字段
  */
  async create(
    guildId: string,
    name: string,
    parentId?: string,
    type?: string,
    limitAmount?: number,
    voiceQuality?: string,
    isCategory?: number,
  ): Promise<Required<GuildChannel>> {
    const data = (
      await this.client.post('v3/channel/create', {
        guild_id: guildId,
        name,
        parent_id: parentId,
        type,
        limit_amount: limitAmount,
        voice_quality: voiceQuality,
        is_category: isCategory,
      })
    ).data as KAPIResponse<KGuildChannel>;
    if (data.code === 0) {
      return new GuildChannel(data.data, this.client) as Required<GuildChannel>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 编辑频道
  * @param channelId 服务器中频道的id
  * @param name 频道名称
  * @param level 频道排序
  * @param parentId 分组频道 ID, 设置为 0 为移出分组
  * @param topic 频道简介, 文字频道有效
  * @param slowMode 慢速模式, 单位 ms。目前只支持这些值: 0, 5000, 10000, 15000, 30000, 60000, 120000, 300000, 600000, 900000, 1800000, 3600000, 7200000, 21600000, 文字频道有效
  * @param limitAmount 此频道最大能容纳的用户数量, 最大值 99, 语音频道有效
  * @param voiceQuality 语音音质, 默认为2: 1流畅, 2正常, 3高质量
  * @param password 密码, 语音频道有效
  */
  async update(
    channelId: string,
    name?: string,
    level?: number,
    parentId?: string,
    topic?: string,
    slowMode?: number,
    limitAmount?: number,
    voiceQuality?: string,
    password?: string,
  ): Promise<Required<GuildChannel>> {
    const data = (
      await this.client.post('v3/channel/update', {
        channel_id: channelId,
        name,
        level,
        parent_id: parentId,
        topic,
        slow_mode: slowMode,
        limit_amount: limitAmount,
        voice_quality: voiceQuality,
        password,
      })
    ).data as KAPIResponse<KGuildChannel>;
    if (data.code === 0) {
      return new GuildChannel(data.data, this.client) as Required<GuildChannel>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除频道
   * @param channelId 频道 id
   */
  async delete(channelId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/channel/delete', {
        channel_id: channelId,
      })
    ).data as KAPIResponse<null>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 语音频道用户列表
  * @param channelId 频道 id, 必须是语音频道
  */
  async userList(channelId: string): Promise<GuildUser[]> {
    const data = (
      await this.client.get('v3/channel/user-list', {
        channel_id: channelId,
      })
    ).data as KAPIResponse<KGuildUserData[]>;
    if (data.code === 0) {
      const guildUserList = [];
      for (const user of data.data) {
        guildUserList.push(new GuildUser(user, this.client));
      }
      return guildUserList;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 语音频道之间移动用户
   * 只能在语音频道之间移动, 用户也必须在其他语音频道在线才能够移动到目标频道.
   * @param channelId 频道 id, 需要是语音频道
   * @param userIds 用户id的数组
   */
  async moveUser(channelId: string, userIds: string[]): Promise<boolean> {
    const data = (
      await this.client.post('v3/channel/move-user', {
        target_id: channelId,
        user_ids: userIds,
      })
    ).data as KAPIResponse<null>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
