import { BaseClient } from '../../client/index.js';
import RequestError from '../../models/Error/RequestError.js';
import { KAPIResponse } from '../types.js';
import { KGetCurrentUserInfoResponse } from './types.js';

export class UserAPI {
  private self: BaseClient;
  constructor(self: BaseClient) {
    this.self = self;
  }
  async me(): Promise<KGetCurrentUserInfoResponse> {
    const data = (await this.self.get('v3/user/me', {}))
      .data as KAPIResponse<KGetCurrentUserInfoResponse>;
    if (data.code === 0) {
      return data.data;
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
