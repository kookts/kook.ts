import { CamelCasedPropertiesDeep } from 'type-fest';
import { BaseClient } from '../../client/index.js';
import { BaseModel, KBaseModel } from '../base.js';

export class BaseUser extends BaseModel implements KBaseUserData {
  username?: string;
  identifyNum?: string;
  online?: boolean;
  avatar?: string;
  bot?: boolean;
  constructor(data: KBaseUserData, client: BaseClient) {
    super(data, client);
    Object.assign(this, data);
  }
}

export interface KBaseUserRaw extends KBaseModel {
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户名 # 后的 4 位识别 id
   */
  identify_num: string;
  /**
   * 是否在线
   */
  online: boolean;
  /**
   * 头像图片地址
   */
  avatar: string;
  /**
   * 是否为机器人
   */
  bot: boolean;
}

export type KBaseUserData = Partial<CamelCasedPropertiesDeep<KBaseUserRaw>> &
  Pick<CamelCasedPropertiesDeep<KBaseUserRaw>, 'id'>;
