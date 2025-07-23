// Simple interfaces for guild role grant/revoke responses
// These are lightweight response objects and don't need factory classes
export interface GuildRoleGrantResponse {
  userId: string;
  guildId: string;
  roles: number[];
}

export interface GuildRoleRevokeResponse {
  userId: string;
  guildId: string;
  roles: number[];
}
