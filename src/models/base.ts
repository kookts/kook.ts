import { BaseClient } from '../client/base.js';

export class BaseModel implements KBaseInterface {
  client!: BaseClient;
  id!: string;
  initialized: boolean;  // mark if this object is fully initialized(maybe id only)
  [key: string]: unknown;
  constructor(data: KBaseInterface, client: BaseClient) {
    Object.assign(this, data);
    this.client = client;
    this.initialized = false;
  }
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
