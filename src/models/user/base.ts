import { BaseClient } from '../../client/index.js';
import { BaseModel, BaseModelFactory, KBaseInterface } from '../base.js';

export class BaseUser extends BaseModel implements KBaseUser {
  username?: string;
  identifyNum?: string;
  online?: boolean;
  avatar?: string;
  bot?: boolean;
}

export class BaseUserFactory extends BaseModelFactory(BaseUser) {
  public static create(
    data: KBaseUser,
    client: BaseClient
  ): Required<BaseUser> {
    let base = super.create(data, client);
    return base as Required<BaseUser>;
  }
}
interface KBaseUserInterface extends KBaseInterface {
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户名 # 后的 4 位识别 id
   */
  identifyNum: string;
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

export type KBaseUser = Partial<KBaseUserInterface> &
  Pick<KBaseUserInterface, 'id'>;
