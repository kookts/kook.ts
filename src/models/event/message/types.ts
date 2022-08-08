import { CamelCasedPropertiesDeep } from 'type-fest';
import { KMessageEvent } from '../../../client/event-receiver/types.js';
import { KBaseUserRaw } from '../../user/base.js';

interface TextMessageExtraRaw {
  type: number;
  guild_id: string;
  channel_name: string;
  mention: string[];
  mention_all: boolean;
  mention_roles: number[];
  mention_here: boolean;
  author: KBaseUserRaw;
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
  author: KBaseUserRaw;
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
