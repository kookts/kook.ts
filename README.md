# kook.ts

Javascript/Typescript SDK For KOOK.

## 优点

- 对事件等进行了封装，保障 KOOK 事件及 API 发生改变的时候可以完美兼容，无需改动代码；
- 最稳定的连接实现，无需担心掉线问题（感谢的 fsm）；
- 全面的 API 覆盖
- 超简单的上手，完善的文档

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
- [ ] 重复 Object.assign 性能优化

### API TODO
- [x] channel
- [ ] asset
- [ ] channel-role
- [ ] direct-message
- [x] guild
- [ ] guild-mute
- [ ] guild-role
- [ ] intimacy
- [ ] invite
- [ ] message
- [ ] user
- [ ] user-chat
- [ ] other(to be added)

## 关于使用 VS Code 进行 Debug 时不显示日志的问题

在 Debug 配置中增加一行`"outputCapture": "std"`即可。

## 变量命名

KGuildUser: object from kook with camel case(mainly for interface)

KGuildUserRaw: object from kook with snake case(do not use unless required)

KGuildUserData: object from kook with camel case & required data set(e.g.: id)
