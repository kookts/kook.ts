import { BaseClient } from '../client/base.js';

export class BaseModel implements KBaseInterface {
  client!: BaseClient;
  id!: string;
  _initialized: boolean; // mark if this object is fully initialized(maybe id only)
  [key: string]: unknown;
  constructor(data: KBaseInterface, client: BaseClient) {
    this.client = client;
    this.id = data.id;
    this._initialized = false;
  }
}

export function BaseModelFactory<T extends BaseModel>(
  constructor: new (...args: any[]) => T
) {
  abstract class BaseModelFactory {
    public static create(
      data: KBaseInterface,
      client: BaseClient,
      ...args: any
    ): T {
      let base = new constructor(data, client);
      Object.assign(base, data);
      return base;
    }
  }
  return BaseModelFactory;
}

/**
 * KBaseInterface is message base from kook server.
 *
 * @export
 * @interface KBaseInterface
 */
export interface KBaseInterface {
  id: string;
}

/**
 * KPartialModel is partial model from KBaseInterface.
 *
 * @export
 * @template T
 * @param {T} extends KBaseInterface
 * @returns {Partial<T> & Pick<T, 'id'>}
 */
export type KPartialModel<T extends KBaseInterface> = Partial<T> &
  Pick<T, 'id'>;
