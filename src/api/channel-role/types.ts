import { KGuildUser } from '../../models/index.js';

interface permissionUsers {
  user: KGuildUser;
  allow: number;
  deny: number;
}
[];

interface permissionOverwrites {
  roleId: number;
  allow: number;
  deny: number;
}
[];
export interface KChannelRoleListResponse {
  permissionOverwrites: permissionOverwrites;
  permissionUsers: permissionUsers;
  permissionSync: boolean;
}

export interface ChannelRoleListResponse {
  permissionOverwrites: permissionOverwrites;
  permissionUsers: permissionUsers;
  permissionSync: boolean;
}
export interface KChannelRoleUpdateResponse {
  role_id: number;
  allow: number;
  deny: number;
}
export interface ChannelRoleSyncResponse {
  permissionOverwrites: permissionOverwrites;
  permissionUsers: permissionUsers;
}
export interface KChannelRoleSyncResponse {
  permissionOverwrites: permissionOverwrites;
  permissionUsers: permissionUsers;
}

export type ChannelRoleUpdateResponse = KChannelRoleUpdateResponse;
