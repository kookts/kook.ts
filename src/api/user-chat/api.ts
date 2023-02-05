import { BaseClient } from '../../client/index.js';
import RequestError from '../../models/Error/RequestError.js';
import { KAPIResponse } from '../types.js';
import { KUserChatSession } from './types.js';

export class UserChatAPI {
  private client: BaseClient;
  constructor(self: BaseClient) {
    this.client = self;
  }
  /**
   * 获取私信聊天会话列表
   */
  async index(): Promise<KUserChatSession[]> {
    const data = (await this.client.get('v3/user-chat/index', {}))
      .data as KAPIResponse<KUserChatSession[]>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取私信聊天会话详情
   * @param chatCode 私聊会话 Code
   */
  async view(chatCode: string): Promise<KUserChatSession> {
    const data = (
      await this.client.get('v3/user-chat/view', {
        chat_code: chatCode,
      })
    ).data as KAPIResponse<KUserChatSession>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
  /**
   * 创建私信聊天会话
   * @param targetId 目标用户 id
   */
  async create(targetId: string): Promise<KUserChatSession> {
    const data = (
      await this.client.post('v3/user-chat/create', {
        target_id: targetId,
      })
    ).data as KAPIResponse<KUserChatSession>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 创建私信聊天会话
   * @param targetId 目标用户 id
   */
  async delete(targetId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/user-chat/delete', {
        target_id: targetId,
      })
    ).data as KAPIResponse<KUserChatSession>;
    if (data.code === 0) {
      return false;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
