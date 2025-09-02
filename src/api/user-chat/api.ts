import RequestError from '../../models/error/RequestError.js';
import { KAPIResponse } from '../types.js';
import { KUserChatSession } from './types.js';
import { ApiBase } from '../base.js';
import {
  UserChatSession,
  UserChatSessionFactory,
} from '../../models/user/chat.js';

export class UserChatAPI extends ApiBase {
  /**
   * 获取私信聊天会话列表
   */
  async index(): Promise<UserChatSession[]> {
    const data = (await this.client.get('v3/user-chat/index', {}))
      .data as KAPIResponse<KUserChatSession[]>;
    if (data.code === 0) {
      return data.data.map((d) =>
        UserChatSessionFactory.create(d, this.client)
      );
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取私信聊天会话详情
   * @param chatCode 私聊会话 Code
   */
  async view(chatCode: string): Promise<UserChatSession> {
    const data = (
      await this.client.get('v3/user-chat/view', {
        chat_code: chatCode,
      })
    ).data as KAPIResponse<KUserChatSession>;
    if (data.code === 0) {
      return UserChatSessionFactory.create(data.data, this.client);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
  /**
   * 创建私信聊天会话
   * @param targetId 目标用户 id
   */
  async create(targetId: string): Promise<UserChatSession> {
    const data = (
      await this.client.post('v3/user-chat/create', {
        target_id: targetId,
      })
    ).data as KAPIResponse<KUserChatSession>;
    if (data.code === 0) {
      return UserChatSessionFactory.create(data.data, this.client);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除私信聊天会话
   * @param chatCode 目标私信会话 Code
   */
  async delete(chatCode: string): Promise<void> {
    const data = (
      await this.client.post('v3/user-chat/delete', {
        chat_code: chatCode,
      })
    ).data as KAPIResponse<unknown>;
    if (data.code !== 0) {
      throw new RequestError(data.code, data.message);
    }
  }
}
