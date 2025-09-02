import RequestError from '../../models/error/RequestError.js';
import {
  RobotUser,
  RobotUserFactory,
} from '../../models/user/self.js';
import { ApiBase } from '../base.js';
import { KAPIResponse } from '../types.js';
import { KGetCurrentUserInfoResponse } from './types.js';

export class UserAPI extends ApiBase {
  async me(): Promise<Required<RobotUser>> {
    const data = (await this.client.get('v3/user/me', {}))
      .data as KAPIResponse<KGetCurrentUserInfoResponse>;
    if (data.code === 0) {
      return RobotUserFactory.create(data.data as any, this.client);
    } else {
      throw new RequestError(data.code, data.message);
    }
  }
}
