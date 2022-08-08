import { default as Koa } from 'koa';
import { createDecipheriv } from 'crypto';
import { zeroPadding } from '../../utils.js';
import { BaseClient } from '../index.js';
import { BaseReceiver } from './base.js';
import { KPacket, KEventPacket } from './types.js';

class WebhookReceiver extends BaseReceiver {
  key?: Buffer;
  port: number;
  verifyToken?: string;
  constructor(client: BaseClient) {
    super(client);
    const config = client.config;
    if (config.key) {
      this.key = zeroPadding(config.key || '');
    }
    this.port = config.port ?? 8600;
    if (config.verifyToken) this.verifyToken = config.verifyToken;
  }
  async connect() {
    const app = new Koa();
    app.use(this.route.bind(this));
    this.client.logger.info('Webhook client start at port %s', this.port);
    return;
  }
  private async route(
    context: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
    next: Koa.Next
  ) {
    const request = (context.request as any).body;
    let eventRequest: KPacket;
    if (this.key) {
      try {
        eventRequest = this.decryptRequest(request);
      } catch (error) {
        console.warn('Decrypt Error', error);
        return next();
      }
    } else {
      eventRequest = request;
    }
    if (!this.verifyRequest(eventRequest)) {
      return next();
    }
    if (this.handleChallenge(eventRequest, context)) {
      return;
    }
    context.body = 1;
    this.onEventArrive(eventRequest as KEventPacket);
  }

  /**
   * 解密
   * @param request 请求体
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private decryptRequest(request: any): KPacket {
    if (typeof request.encrypt === 'string') {
      if (!this.key) {
        throw new Error('No decryption key');
      }
      const encrypted = Buffer.from(request.encrypt, 'base64');
      const iv = encrypted.subarray(0, 16);
      const encryptedData = Buffer.from(
        encrypted.subarray(16, encrypted.length).toString(),
        'base64'
      );
      const decipher = createDecipheriv('aes-256-cbc', this.key, iv);
      const decrypt = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
      ]);
      const data = JSON.parse(decrypt.toString());
      return data as KPacket;
    } else {
      console.debug('Unencrypted Request');

      return request as KPacket;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private verifyRequest(body: any): boolean {
    if (
      typeof body !== 'object' ||
      typeof body.s !== 'number' ||
      typeof body.d !== 'object'
    ) {
      return false;
    }
    if (
      typeof this.verifyToken !== 'undefined' &&
      body.d.verify_token !== this.verifyToken
    ) {
      return false;
    }
    return true;
  }

  private handleChallenge(
    eventRequest: KPacket,
    context: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>
  ) {
    if (
      eventRequest.d.type === 255 &&
      eventRequest.d.channel_type === 'WEBHOOK_CHALLENGE'
    ) {
      context.body = {
        challenge: eventRequest.d.challenge,
      };
      return true;
    }
    return false;
  }
}

export { WebhookReceiver };
