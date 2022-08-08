export interface KIntimacyImage {
  id: string;
  url: string;
}

export interface KIntimacyIndexResponse {
  img_url: string;
  social_info: string;
  last_read: number;
  img_list: KIntimacyImage[];
}

export interface IntimacyImageInternal {
  id: string;
  url: string;
}

export interface IntimacyIndexResponseInternal {
  imgUrl: string;
  socialInfo: string;
  lastRead: number;
  imgList: IntimacyImageInternal[];
}
