import { BaseClient } from '../../client/base.js';
import RequestError from '../../models/error/RequestError.js';
import { GuildUser } from '../../models/user/guild.js';
import { KAPIResponse } from '../types.js';
import {
  KChannelRoleListResponse,
  KChannelRoleUpdateResponse,
  ChannelRoleListResponse,
  ChannelRoleUpdateResponse,
} from './types.js';

export class ChannelRoleAPI {
  private client: BaseClient;
  constructor(self: BaseClient) {
    this.client = self;
  }

  /**
   * 频道角色权限详情
   * @param channelId 频道id
   */
  async index(channelId: string): Promise<ChannelRoleListResponse> {
    const data = (
      await this.client.get('v3/channel-role/index', {
        channel_id: channelId,
      })
    ).data as KAPIResponse<KChannelRoleListResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 创建频道角色权限
   * @param channelId 频道id, 如果频道是分组的id,会同步给所有sync=1的子频道
   * @param type value的类型，只能为"role_id","user_id",不传则默认为"role_id"
   * @param value value的值
   */
  async create(
    channelId: string,
    type: 'role_id' | 'user_id',
    value: string
  ): Promise<boolean> {
    const data = (
      await this.client.post('v3/channel-role/create', {
        channel_id: channelId,
        type,
        value,
      })
    ).data as KAPIResponse<Record<string, never>>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async update(
    channelId: string,
    type: 'role_id' | 'user_id',
    value: string,
    allow: number | undefined,
    deny?: number
  ): Promise<ChannelRoleUpdateResponse> {
    if (typeof allow === 'undefined' && typeof deny === 'undefined') {
      throw new Error('Argument Required: provide either allow or deny.');
    }
    const data = (
      await this.client.post('v3/channel-role/update', {
        channel_id: channelId,
        type,
        value,
        allow,
        deny,
      })
    ).data as KAPIResponse<KChannelRoleUpdateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除频道角色权限
   * @param channelId 频道id, 如果频道是分组的id,会同步给所有sync=1的子频道
   * @param type value的类型，只能为"role_id","user_id",不传则默认为"role_id"
   * @param value value的值，默认为0
   */
  async delete(channelId: string, type: string, value = '0'): Promise<boolean> {
    const data = (
      await this.client.post('v3/channel-role/delete', {
        channel_id: channelId,
        type,
        value,
      })
    ).data as KAPIResponse<Record<string, never>>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
