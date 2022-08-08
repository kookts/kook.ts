import { KGuildUserData } from '../../models/index.js';

export interface KChannelRoleListResponse {
  permissionOverwrites: {
    roleId: number;
    allow: number;
    deny: number;
  }[];
  permissionUsers: {
    user: any;
    allow: number;
    deny: number;
  }[];
  permissionSync: boolean;
}

export interface ChannelRoleListResponse {
  permissionOverwrites: {
    roleId: number;
    allow: number;
    deny: number;
  }[];
  permissionUsers: {
    user: KGuildUserData;
    allow: number;
    deny: number;
  }[];
  permissionSync: boolean;
}
export interface KChannelRoleUpdateResponse {
  role: number;
  allow: number;
  deny: number;
}

export type ChannelRoleUpdateResponse = KChannelRoleUpdateResponse;
