import { BaseClient } from '../../client/index.js';
import RequestError from '../../models/Error/RequestError.js';
import { KAPIResponse } from '../types.js';
import {
  InviteCreateResponse,
  InviteListResponse,
  KInviteCreateResponse,
  KInviteListResponse,
} from './types.js';

export class InviteAPI {
  private self: BaseClient;
  constructor(self: BaseClient) {
    this.self = self;
  }

  private argChecker(guildId?: string, channelId?: string) {
    if (!guildId && !channelId)
      throw new Error(
        'Argument Required: no guild id or channel id provided, should at least provide one.'
      );
  }

  /**
   * 获取邀请列表
   * @param guildId 服务器id
   */
  async list(
    guildId?: string,
    channelId?: string
  ): Promise<InviteListResponse> {
    this.argChecker(guildId, channelId);
    const data = (
      await this.self.get('v3/invite/list', {
        guild_id: guildId,
        channel_id: channelId,
      })
    ).data as KAPIResponse<KInviteListResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async create(
    guildId?: string,
    channelId?: string
  ): Promise<InviteCreateResponse> {
    this.argChecker(guildId, channelId);
    const data = (
      await this.self.get('v3/invite/create', {
        guild_id: guildId,
        channel_id: channelId,
      })
    ).data as KAPIResponse<KInviteCreateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async delete(
    urlCode: string,
    guildId?: string,
    channelId?: string
  ): Promise<boolean> {
    this.argChecker(guildId, channelId);
    const data = (
      await this.self.post('v3/invite/delete', {
        url_code: urlCode,
        guild_id: guildId,
        channel_id: channelId,
      })
    ).data as KAPIResponse<null>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
