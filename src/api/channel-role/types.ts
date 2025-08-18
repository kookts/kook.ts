import { KGuildUser } from '../../models/index.js';

export interface KChannelPermissionUser {
  user: KGuildUser;
  allow: number;
  deny: number;
}

export interface KChannelPermissionOverwrite {
  roleId: number;
  allow: number;
  deny: number;
}

export interface KChannelRoleListResponse {
  permissionOverwrites: KChannelPermissionOverwrite[];
  permissionUsers: KChannelPermissionUser[];
  permissionSync: boolean;
}

export interface ChannelRoleListResponse {
  permissionOverwrites: KChannelPermissionOverwrite[];
  permissionUsers: KChannelPermissionUser[];
  permissionSync: boolean;
}

export interface KChannelRoleUpdateResponse {
  role_id: number;
  allow: number;
  deny: number;
}

export interface ChannelRoleUpdateResponse {
  roleId: number;
  allow: number;
  deny: number;
}

export interface ChannelRoleSyncResponse {
  permissionOverwrites: KChannelPermissionOverwrite[];
  permissionUsers: KChannelPermissionUser[];
}

export interface KChannelRoleSyncResponse {
  permissionOverwrites: KChannelPermissionOverwrite[];
  permissionUsers: KChannelPermissionUser[];
}
