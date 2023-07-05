import { ApiBase } from '../base.js';
import RequestError from '../../models/error/RequestError.js';
import { KAPIResponse } from '../types.js';
import {
  KChannelRoleListResponse,
  KChannelRoleUpdateResponse,
  ChannelRoleListResponse,
  ChannelRoleUpdateResponse,
  ChannelRoleSyncResponse,
  KChannelRoleSyncResponse,
} from './types.js';

export class ChannelRoleAPI extends ApiBase {
  /**
   * 频道角色权限详情
   * @param channelId 频道id
   */
  async index(channelId: string): Promise<ChannelRoleListResponse> {
    const data = (
      await this.client.get('v3/channel-role/index', this.toParams({
        channelId,
      }))
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
      await this.client.post('v3/channel-role/create', this.toParams({
        channelId,
        type,
        value,
      }))
    ).data as KAPIResponse<Record<string, never>>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 更新频道角色权限
  * @param channelId 频道id, 如果频道是分组的id,会同步给所有sync=1的子频道
  * @param type value的类型, 只能为"role_id", "user_id",不传则默认为"role_id"
  * @param value 根据 type 的值, 为用户 id 或角色 id
  * @param allow 默认为 0, 想要设置的允许的权限值
  * @param deny 默认为 0, 想要设置的拒绝的权限值
  */
  async update(
    channelId: string,
    type: 'role_id' | 'user_id',
    value: string,
    allow?: number,
    deny?: number
  ): Promise<ChannelRoleUpdateResponse> {
    if (typeof allow === 'undefined' && typeof deny === 'undefined') {
      throw new Error('Argument Required: provide either allow or deny.');
    }
    const data = (
      await this.client.post('v3/channel-role/update', this.toParams({
        channelId,
        type,
        value,
        allow,
        deny,
      }))
    ).data as KAPIResponse<KChannelRoleUpdateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
  * 同步频道角色权限
  * @param channelId 频道id
  */
  async sync(channelId: string,): Promise<ChannelRoleSyncResponse> {
    const data = (
      await this.client.post('v3/channel-role/sync', this.toParams({
        channelId
      }))
    ).data as KAPIResponse<KChannelRoleSyncResponse>;
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
      await this.client.post('v3/channel-role/delete', this.toParams({
        channelId,
        type,
        value,
      }))
    ).data as KAPIResponse<Record<string, never>>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
