import { BaseClient } from '../../client/index.js';
import { BaseUser, KBaseUser } from './base.js';
import { BaseModelFactory } from '../base.js';

/**
 * SelfUser represents the currently authenticated user with extra profile fields
 */
export class RobotUser extends BaseUser implements KSelfUser {
  status?: number;
  mobileVerified?: boolean;
  system?: boolean;
  mobilePrefix?: string;
  mobile?: string;
  invitedCount?: number;
}

export class RobotUserFactory extends BaseModelFactory(RobotUser) {
  public static create(
    data: KSelfUser,
    client: BaseClient
  ): Required<RobotUser> {
    const base = super.create(data, client);
    return base as Required<RobotUser>;
  }
}

interface KRobotUserInterface extends KBaseUser {
  status: number;
  mobileVerified: boolean;
  system: boolean;
  mobilePrefix: string;
  mobile: string;
  invitedCount: number;
}

export type KSelfUser = Partial<KRobotUserInterface> &
  Pick<KRobotUserInterface, 'id'> &
  KBaseUser;
