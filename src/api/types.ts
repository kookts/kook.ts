/* eslint-disable camelcase */

export interface KAPIResponse<KRequestType> {
  code: number;
  message: string;
  data: KRequestType;
}

export interface KAPIMultiPage<KItemType> {
  items: KItemType[];
  meta: {
    page: number;
    pageTotal: number;
    pageSize: number;
    total: number;
  };
  sort: Record<string, number>;
  [key: string]: unknown;
}
