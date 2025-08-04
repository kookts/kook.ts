# kook.ts

Javascript/Typescript SDK For KOOK.

## 🚀 核心优势

### 专为 KOOK 深度定制
- 与 KOOK 官方 API 完美对接，支持最新的API
- 相比通用机器人框架，提供最佳的灵活性和性能
- 完整覆盖 KOOK 平台特有功能

### 极致的开发体验
- 完整的 TypeScript 支持：提供类型安全，减少运行时错误
- 强大的事件系统：支持通配符匹配，如 message.* 和 event.*
- 智能的数据封装：API 返回值自动封装为易用的 Class 对象
- 对事件等进行了封装，保障 KOOK 事件及 API 发生改变的时候可以完美兼容，无需改动代码；

### 久经考验的稳定性
- 双模式连接：支持 WebSocket 和 Webhook 模式
- 自动重连机制：基于 FSM（有限状态机）的稳定连接实现(感谢@@raycursive)
- 完善的错误处理：统一的错误处理机制，便于调试和监控

### 简单易用的API设计
```javascript
import { BaseClient } from 'kookts/client/index.js';
import * as dotenv from 'dotenv';
import { GuildMessage } from 'kookts/models/index.js';

dotenv.config();
// 简洁的使用方式

const client = new BaseClient({
  mode: 'websocket',
  token: process.env.TOKEN!,
  logConfig: { level: 'debug' },
});

client.on('message.*', (data: GuildMessage) => {
  if (data.user.bot) return;
  console.log(client.Api.message.create(9, data.channel.id, data.content));
  console.log(data);
});

client.connect();
```

### 性能优化及开发流程简化
- 性能优化：避免重复 Object.assign，提升运行效率
- 日志系统：集成 Winston 日志框架，支持多种输出格式
- 缓存机制：内置缓存系统，减少不必要的 API 调用
- 请求拦截：自动处理认证和响应数据格式化

## 📦 主要功能模块
频道管理：完整的频道 CRUD 操作和权限管理
消息系统：支持文本、卡片、图片等多种消息类型
用户管理：用户信息获取、角色管理
事件监听：实时接收各类平台事件
API 封装：覆盖 KOOK 平台主要 API 接口

## Trouble Shooting
关于使用 VS Code 进行 Debug 时不显示日志的问题

>在 Debug 配置中增加一行`"outputCapture": "std"`即可。



