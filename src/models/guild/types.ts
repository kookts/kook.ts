// deprecated

export interface KGuildRaw {
  /**
   * 默认频道
   */
  default_channel_id: string;
  /**
   * 是否为公开服务器
   */
  enable_open: number;
  /**
   * 服务器icon的地址
   */
  icon: string;
  /**
   * 服务器id
   */
  id: string;
  /**
   * 是否开启邀请
   */
  invite_enabled: number;
  /**
   * 当前用户是否为服务器主人
   */
  is_master: boolean;
  /**
   * 服务器名称
   */
  name: string;
  /**
   * 通知类型, `0`代表默认使用服务器通知设置，`1`代表接收所有通知, `2`代表仅@被提及，`3`代表不接收通知
   */
  notify_type: number;
  /**
   * 公开服务器id
   * 文档写string，实际为number
   */
  open_id: string;
  /**
   * 服务器主题
   */
  topic: string;
  /**
   * 欢迎频道
   */
  welcome_channel_id: string;
  /**
   * 服务器主的id
   */
  master_id: string;
  /**
   * 服务器默认使用语音区域
   */
  region: string;
}
