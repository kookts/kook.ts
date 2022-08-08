// import { camelcaseKeys } from 'camelcase-keys';
// import { CamelCaseKeys } from 'camelcase-keys';

import camelcaseKeys from 'camelcase-keys';
import { CamelCasedPropertiesDeep } from 'type-fest';

export function zeroPadding(key: string): Buffer {
  const keyByte = Buffer.from(key, 'utf-8');
  if (keyByte.length < 32) {
    const result = Buffer.alloc(32);
    Buffer.from(key, 'utf-8').copy(result);
    return result;
  }
  return keyByte;
}

// export function toCamelCase(object: any): any {
//   return object;
// }
export function toCamelCase<T>(object: T): CamelCasedPropertiesDeep<T> {
  return camelcaseKeys(object, { deep: true }) as any;
}
