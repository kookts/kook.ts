import { ConstructorOptions, EventEmitter2 } from 'eventemitter2';
import { LoggerOptions } from 'winston';

export interface ClientConfig {
  mode: 'webhook' | 'websocket';
  port?: number;
  key?: string;
  token: string;
  /**
   * 校验码，需要和
   */
  verifyToken?: string;
  /**
   * cookie 客户端模拟模式必填。
   */
  cookies?: string;
  logConfig?: LoggerOptions;
  eventEmitterConfig?: ConstructorOptions;
}

export interface BaseConnector extends EventEmitter2 {
  connect: () => Promise<void>;
}

// export interface KaiheilaBotInterface {
//   /**
//    * 目前开黑啦官方提供的所有API
//    */
//   api: Api;
//   /**
//    * 消息源
//    */
//   emitter: BaseConnector;
//   /**
//    * 配置好的axios
//    */
//   axios: AxiosInstance;
//   on(event: string, listener: (event: unknown) => void): this;
//   on(event: 'allMessages', listener: (event: unknown) => void): this;
//   on(event: 'systemMessage', listener: (event: unknown) => void): this;
//   on(event: 'textMessage', listener: (event: TextMessage) => void): this;
//   on(event: 'imageMessage', listener: (event: ImageMessage) => void): this;
//   on(event: 'videoMessage', listener: (event: VideoMessage) => void): this;
//   on(event: 'fileMessage', listener: (event: FileMessage) => void): this;
//   on(event: 'audioMessage', listener: (event: AudioMessage) => void): this;
//   on(
//     event: 'kmarkdownMessage',
//     listener: (event: KMarkdownMessage) => void
//   ): this;

//   on(event: 'buttonClick', listener: (event: ButtonClickEvent) => void): this;
//   /**
//    * 未知的事件
//    */
//   on(event: 'unknownEvent', listener: (event: unknown) => void): this;
// }
