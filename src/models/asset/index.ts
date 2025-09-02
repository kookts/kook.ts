import { BaseClient } from '../../client/index.js';
import { BaseModel, BaseModelFactory, KBaseInterface } from '../base.js';

export class Asset extends BaseModel implements KAssetInternal {
  url: string;
  constructor(data: KAssetInternal, client: BaseClient) {
    super(data, client);
    this.url = data.url;
  }
}

export class AssetFactory extends BaseModelFactory(Asset) {
  public static create(data: any, client: BaseClient): Required<Asset> {
    const raw: KAssetCreate = data;
    const base = super.create(
      { id: raw.url, url: raw.url } as any,
      client
    ) as Asset;
    return base as Required<Asset>;
  }
}

interface KAssetInternal extends KBaseInterface {
  url: string;
}

export interface KAssetCreate {
  url: string;
}
