# kook.ts

Javascript/Typescript SDK For KOOK.

## 优点

- 对事件等进行了封装，保障 KOOK 事件及 API 发生改变的时候可以完美兼容，无需改动代码；
- 最稳定的连接实现，无需担心掉线问题（感谢 @raycursive 的 fsm）；
- 全面的 API 覆盖
- 超简单的上手，完善的文档（还没写）

## 基础使用方法

消息事件为'message.\*',其中\*为 1-10，与官方文档保持一致；  
系统事件为'event.\*'，其中\*为事件名，如"add_reaction"；  
原始事件为'raw'，为系统原始下发的事件。

事件支持 wild card, 可以使用\*通配符进行匹配。

```javascript
import { BaseClient } from 'kookts/client/index.js';
import * as dotenv from 'dotenv';
import { GuildMessage } from 'kookts/models/index.js';

dotenv.config();

const client = new BaseClient({
  mode: 'websocket',
  token: process.env.TOKEN!,
  verifyToken: process.env.VERIFY,
  key: process.env.KEY,
  logConfig: { level: 'debug' },
});

client.on('message.*', (data: GuildMessage) => {
  if (data.user.bot) return;
  console.log(client.Api.message.create(9, data.channel.id, data.content));
  console.log(data);
});

client.connect();
```

## TODO

- [x] 完成 MessageSource 迁移
- [x] 完成 EventEmitter 迁移
- [x] 完成 WebSocket 迁移
- [ ] EventEmitter on() 类型补全
- [ ] 增加 Webhook 对 compress 的适配
- [ ] 补全 Models
- [ ] 完成 API 迁移
- [ ] 增加 API
- [ ] 增加消息队列
- [ ] 增加自动跟随限速
- [x] 重复 Object.assign 性能优化

### API TODO

- [ ] model: message
- [x] channel
- [ ] asset
- [ ongoing ] channel-role
- [ ] direct-message
- [x] guild
- [ ] guild-mute
- [ ] guild-role
- [ ] intimacy
- [ ] invite
- [ ongoing ] message
- [ ] user
- [ ] user-chat
- [ ] other(to be added)

## 关于使用 VS Code 进行 Debug 时不显示日志的问题

在 Debug 配置中增加一行`"outputCapture": "std"`即可。



