import RequestError from '../../models/error/RequestError.js';
import { KAPIResponse } from '../types.js';
import { KMessageCreateResponse, MessageCreateResponse } from './types.js';
import { GuildUser, KGuildUser } from '../../models/user/guild.js';
import { ApiBase } from '../base.js';
import { MessageType } from '../../models/message/types.js';
import { BaseMessage, KBaseMessage } from '../../models/message/base.js';
import {
  GuildMessage,
  GuildMessageFactory,
  KGuildMessage,
} from '../../models/message/guild.js';

export class MessageAPI extends ApiBase {
  /**
   * 发送频道聊天消息
   * 注意： 强列建议过滤掉机器人发送的消息，再进行回应。否则会很容易形成两个机器人循环自言自语导致发送量过大，进而导致机器人被封禁。如果确实需要机器人联动的情况，慎重进行处理，防止形成循环。
   * @param type 消息类型, 见[type], 不传默认为 `1`, 代表文本类型。`2` 图片消息，`3` 视频消息，`4` 文件消息，`9` 代表 kmarkdown 消息, `10` 代表卡片消息。
   * @param targetId 目标频道 id
   * @param content 消息内容
   * @param quote 回复某条消息的 `msgId`
   * @param tempTargetId 用户id,如果传了，代表该消息是临时消息，该消息不会存数据库，但是会在频道内只给该用户推送临时消息。用于在频道内针对用户的操作进行单独的回应通知等。
   */
  async create(
    type: MessageType,
    targetId: string,
    content: string,
    quote?: string,
    tempTargetId?: string
  ): Promise<MessageCreateResponse> {
    const data = (
      await this.client.post(
        'v3/message/create',
        this.toParams({
          type,
          targetId,
          content,
          quote,
          tempTargetId,
          nonce: Math.random(),
        })
      )
    ).data as KAPIResponse<KMessageCreateResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 更新频道聊天消息
   * @param msgId 消息 id
   * @param content 消息内容
   * @param quote 回复某条消息的 msgId。如果为空，则代表删除回复，不传则无影响。
   */
  async update(
    msgId: string,
    content: string,
    quote?: string,
    tempTargetId?: string
  ): Promise<boolean> {
    const data = (
      await this.client.post('v3/message/update', {
        msg_id: msgId,
        content: content,
        quote: quote,
        temp_target_id: tempTargetId,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 删除频道聊天消息
   * @param msgId 消息 id
   */
  async delete(msgId: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/message/delete', {
        msg_id: msgId,
      })
    ).data as KAPIResponse<[]>;
    if (data.code === 0) {
      return true;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  async view(msgId: string): Promise<Required<GuildMessage>> {
    const data = (
      await this.client.get('v3/message/view', this.toParams({ msgId }))
    ).data as KAPIResponse<KGuildMessage>;
    if (data.code === 0) {
      // only guild messsage! private message is at direct-message/view
      const channel = await this.client.Api.channel.view(data.data.channelId);
      return GuildMessageFactory.create(data.data, this.client, channel);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }

  /**
   * 获取频道消息某回应的用户列表  // TODO
   * @param msgId 频道消息的id
   * @param emoji emoji的id, 可以为GuilEmoji或者Emoji
   */
  // async reactionList(
  //   msgId: string,
  //   emoji: string
  // ): Promise<GuildUser & { reactionTime: number }[]> {
  //   const data = (
  //     await this.client.get('v3/message/reaction-list', {
  //       msg_id: msgId,
  //       emoji,
  //     })
  //   ).data as KAPIResponse<KGuildUser[]>;
  //   if (data.code === 0) {
  //     return data.data.map((e) => new GuildUser(e, this.client)) as any;
  //   } else {
  //     throw new RequestError(data.code, data.message);
  //   }
  // }

  /**
   * 给某个消息添加回应
   * @param msgId 频道消息的id
   * @param emoji emoji的id, 可以为GuilEmoji或者Emoji
   */
  async addReaction(msgId: string, emoji: string): Promise<boolean> {
    const data = (
      await this.client.post('v3/message/add-reaction', {
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
      await this.client.post('v3/message/delete-reaction', {
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
