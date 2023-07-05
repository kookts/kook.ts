import { ApiBase } from '../base.js';
import { BaseClient } from '../../client/base.js';
import RequestError from '../../models/error/RequestError.js';
import { GuildUser, KGuildUserData } from '../../models/user/guild.js';
import { KAPIResponse } from '../types.js';
import { KDirectMessageCreateResponse } from './types.js';

export class DirectMessageAPI extends ApiBase {

  /**
   * 获取私信聊天消息列表
   * @param chatCode 目标会话 id
   * @param targetId 目标用户 id，后端会自动创建会话。有此参数之后可不传 `chat_code` 参数
   * @param msgId 参考消息 id，不传则查询最新消息
   * @param flag 查询模式，有三种模式可以选择。不传则默认查询最新的消息。before: 查询参考消息之前的消息，不包括参考消息; around: 查询以参考消息为中心，前后一定数量的消息; after: 查询参考消息之后的消息，不包括参考消息.
   * @param page 目标页数
   * @param page_size 当前分页消息数量, 默认 50
   */
  async list(
    chatCode?: string,
    targetId?: string,
    msgId?: string,
    flag?: string,
    page?: number,
    pageSize?: number,
  ): Promise<KDirectMessageCreateResponse> {
    const data = (
      await this.client.get('v3/direct-message/list', {
        chat_code: chatCode,
        target_id: targetId,
        msg_id: msgId,
        flag,
        page,
        pageSize,
      })
    ).data as KAPIResponse<KDirectMessageCreateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
 * 获取私信聊天消息详情
 * @param chatCode 目标会话 id / 私信会话 code
 * @param msgId 私聊消息 id
 */
  async view(
    chatCode: string,
    msgId: string,
  ): Promise<KDirectMessageCreateResponse> {
    const data = (
      await this.client.get('v3/direct-message/view', {
        chat_code: chatCode,
        msg_id: msgId,
      })
    ).data as KAPIResponse<KDirectMessageCreateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 发送私信聊天消息
   * @param type 消息类型, 见[type], 不传默认为 `1`, 代表文本类型。`2` 图片消息，`3` 视频消息，`4` 文件消息，`9` 代表 kmarkdown 消息, `10` 代表卡片消息。
   * @param targetId 目标用户 id，后端会自动创建会话。有此参数之后可不传 `chat_code` 参数
   * @param chatCode 目标会话 id
   * @param content 消息内容
   * @param quote 回复某条消息的 `msgId`
   */
  async create(
    type: number,
    targetId: string,
    chatCode: string | undefined,
    content: string,
    quote?: string
  ): Promise<KDirectMessageCreateResponse> {
    const data = (
      await this.client.post('v3/direct-message/create', {
        type,
        target_id: targetId,
        content,
        quote,
        chat_code: chatCode,
        nonce: Math.random(),
      })
    ).data as KAPIResponse<KDirectMessageCreateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 更新私信聊天消息
   * @param msgId 消息 id
   * @param content 消息内容
   * @param quote 回复某条消息的 msgId。如果为空，则代表删除回复，不传则无影响。
   */
  async update(
    msgId: string,
    content: string,
    quote?: string
  ): Promise<boolean> {
    const data = (
      await this.client.post('v3/direct-message/update', {
        msg_id: msgId,
        content,
        quote,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除私信聊天消息
   *
   * 只能删除自己的消息。
   * @param msgId 消息 id
   */
  async delete(msgId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/direct-message/delete', {
        msg_id: msgId,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取频道消息某回应的用户列表
   * @param msgId 频道消息的id
   * @param emoji emoji的id, 可以为GuilEmoji或者Emoji
   */
  async reactionList(
    msgId: string,
    emoji: string
  ): Promise<Required<GuildUser>[]> {
    const data = (
      await this.client.get('v3/direct-message/reaction-list', {
        msg_id: msgId,
        emoji,
      })
    ).data as KAPIResponse<KGuildUserData[]>;
    if (data.code === 0) {
      return data.data.map(
        (e) => new GuildUser(e, this.client) as Required<GuildUser>
      );
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 给某个消息添加回应
   * @param msgId 频道消息的id
   * @param emoji emoji的id, 可以为GuilEmoji或者Emoji
   */
  async addReaction(msgId: string, emoji: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/direct-message/add-reaction', {
        msg_id: msgId,
        emoji,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 给某个消息添加回应
   * @param msgId 频道消息的id
   * @param emoji emoji的id, 可以为GuilEmoji或者Emoji
   * @param userId 用户的id, 如果不填则为自己的id。删除别人的reaction需要有管理频道消息的权限
   */
  async deleteReaction(
    msgId: string,
    emoji: string,
    userId: string
  ): Promise<boolean> {
    const data = (
      await this.client.post('v3/direct-message/delete-reaction', {
        msg_id: msgId,
        emoji,
        user_id: userId,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
