import { BaseClient } from '../client/index.js';
import * as dotenv from 'dotenv';
import { GuildMessage } from '../models/index.js';
import { CacheManager } from '../client/event-receiver/cache.js';
import { default as axios, AxiosInstance, AxiosResponse } from 'axios';

dotenv.config();

const client = new BaseClient({
  mode: 'websocket',
  token: process.env.TOKEN!,
  verifyToken: process.env.VERIFY,
  key: process.env.KEY,
  logConfig: { level: 'debug' },
});

client.on('message.*', async (data: GuildMessage) => {
  if (data.user.bot) return;
  console.log(data);
  const chat_message = data.content as string;

  // cache test
  if (chat_message.includes('corgi')) {
    const cache_res = await CacheManager.use_cache({ key: 'corgi', expiration_in_ms: 10000, excute: async () => { return await axios.get('http://worldtimeapi.org/api/timezone/America/Los_Angeles') } })

    const res = cache_res.content as any;
    const time = `Current time is: ${res.data?.datetime} ${res.data?.abbreviation}`;
    await client.Api.message.create(9, data.channel.id, `${time}`);
  } else {
    client.Api.message.create(9, data.channel.id, data.content)
  }
});

client.connect();
