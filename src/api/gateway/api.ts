import { BaseClient } from '../../client/index.js';
import RequestError from '../../models/error/RequestError.js';
import { KAPIResponse } from '../types.js';
import { KGatewayResponse } from './types.js';

export class GatewayAPI {
  private self: BaseClient;
  constructor(self: BaseClient) {
    this.self = self;
  }
  async index(compress = 0): Promise<KGatewayResponse> {
    const data = (
      await this.self.get('v3/gateway/index', {
        compress,
      })
    ).data as KAPIResponse<KGatewayResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
