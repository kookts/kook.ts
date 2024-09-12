import { GuildUser, KGuildUser } from '../../models/index.js';

export interface KMessageCreateResponse {
  msgId: string;
  msgTimestamp: number;
}

export type MessageCreateResponse = KMessageCreateResponse;

export interface KReactionListResponse extends KGuildUser {
  reactionTime: number;
}

export interface ReactionInfo {
  user: GuildUser;
  reactionTime: number;
}
