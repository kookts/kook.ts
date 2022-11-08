import { GuildChannel, KGuildChannel } from '../../models/channel/guild.js';
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

  async view(channelId: string): Promise<Required<GuildChannel>> {
    const data = (
      await this.client.get('v3/channel/view', {
        target_id: channelId,
      })
    ).data as KAPIResponse<KGuildChannel>;
    if (data.code === 0) {
      return new GuildChannel(data.data, this.client) as Required<GuildChannel>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async create(
    guildId: string,
    name: string,
    type?: string,
    parentId?: string,
    limitAmount?: number,
    voiceQuality?: number
  ): Promise<Required<GuildChannel>> {
    const data = (
      await this.client.post('v3/channel/create', {
        guild_id: guildId,
        name,
        type,
        parent_id: parentId,
        limit_amount: limitAmount,
        voice_quality: voiceQuality,
      })
    ).data as KAPIResponse<KGuildChannel>;
    if (data.code === 0) {
      return new GuildChannel(data.data, this.client) as Required<GuildChannel>;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

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
