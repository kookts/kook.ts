import { GuildChannel } from '../models/channel/guild.js';
import { Guild } from '../models/index.js';
import { BaseClient } from './base.js';

class ObjectCache<T> {
  private cache: Map<string, T> = new Map<string, T>();

  public set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  public get(key: string): T {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }
}

export class Cache {
  guild: ObjectCache<Guild> = new ObjectCache();
  channel: ObjectCache<GuildChannel> = new ObjectCache();
  constructor(client: BaseClient) {}
}
