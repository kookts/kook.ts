import { BaseClient } from '../client/index.js';
import * as dotenv from 'dotenv';
import { GuildMessage } from '../models/message/index.js';

dotenv.config();

const client = new BaseClient({
  mode: 'websocket',
  token: process.env.TOKEN!,
  verifyToken: process.env.VERIFY,
  key: process.env.KEY,
  logConfig: { level: 'debug' },
});

client.on('message.*', (data: GuildMessage) => {
  // if (data.user.bot) return;
  console.log(client.Api.message.create(9, data.channel.id, data.content));
  console.log(data);
});

client.connect();

client.Api.guild.view('1446123333814457').then(console.log);
