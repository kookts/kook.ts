import { default as axios, AxiosInstance, AxiosResponse } from 'axios';
import { EventEmitter2 } from 'eventemitter2';
import { format, Logger, createLogger, transports } from 'winston';
import { Api } from '../api/index.js';
import { toCamelCase } from '../utils.js';
import { BaseReceiver } from './event-receiver/base.js';
import { WebhookReceiver } from './event-receiver/webhook.js';
import { WebsocketReceiver } from './event-receiver/websocket.js';
import { ClientConfig } from './types.js';
import { Cache } from './cache.js';

const logFormat = format.combine(
  format.colorize(),
  format.label({ label: 'kookts' }),
  format.timestamp({ format: 'YYMMDD HH:mm:ss.S' }),
  format.align(),
  format.splat(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

export class BaseClient extends EventEmitter2 {
  config: ClientConfig;
  axios: AxiosInstance;
  receiver: BaseReceiver;
  Api: Api;
  logger: Logger;
  _cache: Cache;  // todo

  /**
   * kook机器人实例
   * @param config 设置
   */
  constructor(config: ClientConfig) {
    config.eventEmitterConfig = {
      wildcard: true,
      ...config.eventEmitterConfig,
    };
    super(config.eventEmitterConfig);
    this._cache = new Cache(this);
    this.config = JSON.parse(JSON.stringify(config));
    this.logger = createLogger({
      level: 'debug',
      format: logFormat,
      transports: [new transports.Console()],
      ...config.logConfig,
    });
    if (!config.token) {
      throw new Error('Token Not Provided');
    }

    this.axios = axios.create({
      baseURL: 'https://www.kookapp.cn/api',
      headers: {
        Authorization: 'Bot ' + this.config.token,
      },
    });
    // update response data to camel case
    this.axios.interceptors.response.use((response: AxiosResponse) => {
      if (response.data && response.data.code === 0) {
        response.data = toCamelCase(response.data);
      }
      return response;
    });
    this.Api = new Api(this);
    switch (this.config.mode) {
      case 'webhook':
        this.receiver = new WebhookReceiver(this);
        break;
      default:
        this.receiver = new WebsocketReceiver(this);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  post(url: string, data: any): Promise<AxiosResponse<any>> {
    return this.axios.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  get(url: string, params: any): Promise<AxiosResponse<any>> {
    return this.axios.get(url, {
      params: new URLSearchParams(params),
    });
  }

  /**
   * 链接消息源
   */
  connect(): void {
    this.receiver.connect();
  }
}
