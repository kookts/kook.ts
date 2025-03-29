// not use, will be deprecated!
import { CamelCasedPropertiesDeep } from 'type-fest';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { KBaseUser } from '../user/base.js';


export interface KMessageRaw {
  id: string;
  type: number;
  author: KBaseUser;
  content: string;
  mention: string[];
  mention_all: boolean;
  mention_roles: number[];
  mention_here: boolean;
  embeds?: any[];
  attachments?: {
    type: string;
    name: string;
    url: string;
  };
  reactions: any[];
  quote: any;
  mention_info: {
    mention_part: any[];
    mention_role_part: any[];
  };
}

interface TextMessageExtraRaw {
  type: number;
  guild_id: string;
  channel_name: string;
  mention: string[];
  mention_all: boolean;
  mention_roles: number[];
  mention_here: boolean;
  author: KBaseUser;
}
export type KTextMessageEvent = KMessageEvent<TextMessageExtraRaw>;

export interface ImageMessageExtraRaw {
  type: number;
  code: string;
  guild_id: string;
  attachments: {
    type: string;
    name: string;
    url: string;
  };
  author: KBaseUser;
}
export type KImageMessageEvnet = KMessageEvent<ImageMessageExtraRaw>;

export type MessageEvents = CamelCasedPropertiesDeep<
  KTextMessageEvent | KImageMessageEvnet
>;

interface SystemMessageExtraRaw<T = any> {
  type: string;
  body: T;
}
export type KSystemMessageEvent<T = any> = KMessageEvent<
  SystemMessageExtraRaw<T>
>;

export enum MessageType {
  /**
   * 文本消息类型
   */
  text = 1,
  /**
   * 图片消息类型
   */
  image = 2,
  /**
   * 视频消息类型
   */
  video = 3,
  /**
   * 文件消息类型
   */
  file = 4,
  /**
   * 语音消息类型
   */
  voice = 8,
  /**
   * KMarkdown消息类型
   */
  kMarkdown = 9,
  /**
   * 卡片消息类型
   */
  card = 10,
}