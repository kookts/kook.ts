interface CacheValue {
  [key: string]: string | number | Object;
  key: string; // unique string to key the cache
  epoch_timestamp_in_ms: number;
  expiration_in_ms: number;
  content: Object;
}

interface CacheArgument {
  key: string;
  expiration_in_ms: number;
  excute: () => Promise<any>;
}

export class CacheManager {
  // Actual cache object
  protected static cache: { [index: string]: CacheValue } = {};

  // Use cache. If cache has the 'key' and the content is not expired, return corresponding results. Otherwise, fetch a result and record it, then return the result.
  static async use_cache({ key, expiration_in_ms = 30000, excute }: CacheArgument): Promise<CacheValue | undefined> {
    let value = CacheManager.get(key);
    if (value) {
      return value;
    }

    try {
      const res = await excute();
      CacheManager.set(key, res, expiration_in_ms);
      return CacheManager.get(key);
    } catch (err: any) {
      console.log(err);
    }
  }

  protected static get(key: string): CacheValue | undefined {
    const value = CacheManager.cache[key];
    if (value === undefined) { return undefined; }
    if (CacheManager.IsNotExpired(value)) {
      return value;
    }
    return undefined;
  }

  protected static IsNotExpired(value: CacheValue): boolean {
    if (value === undefined) return false;
    const now = Date.now();
    return (value.epoch_timestamp_in_ms + value.expiration_in_ms) > now;
  }

  protected static has(key: string): boolean {
    return CacheManager.cache.hasOwnProperty(key);
  }

  protected static set(key: string, content: Object, expiration_in_ms: number = 300000) {
    // TODO: add size check and clean if size exceeds limitation
    const cache_value = {
      key: key,
      epoch_timestamp_in_ms: Date.now(), // will it be dysync? ????
      expiration_in_ms,
      content,
    }
    CacheManager.cache[key] = cache_value;
  }


}


// Other class using pattern

// if CacheManager.has(keyword)
// return CacheManager.get(keyword)
// else
// real call and set



// upadte cache
// 主动请求
// 服务器消息（被动） 如果量大 能否handle


// Req: 
// 1. ensure no memory overflow
// 2. data in sync
//   压力测试 看看数据量大的时候cache能不能不卡死 / sync 的问题 （比如js 处理大量被动消息是否会卡死）
//   