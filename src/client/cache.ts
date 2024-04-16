import { BaseClient } from "./base.js";

class ObjectCache {
  private cache: Map<string, any> = new Map<string, any>();

  public set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  public get(key: string): any {
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
  guild: ObjectCache = new ObjectCache();
  channel: ObjectCache = new ObjectCache();
  constructor(client: BaseClient) {}
}
