import { BaseUser } from '../user/index.js';

export interface Channel {
  /**
   * 频道id
   */
  id: string;
  /**
   * 频道名称
   */
  name: string;
  /**
   * 创建者id
   */
  masterId: string;
  /**
   * 服务器id
   */
  guildId: string;
  /**
   * 频道简介
   */
  topic: string;
  /**
   * 是否为分组
   */
  isCategory: boolean;
  /**
   * 上级分组的id
   */
  parentId: string;
  /**
   * 排序level
   */
  level: number;
  /**
   * 慢速模式下限制发言的最短时间间隔, 单位为秒(s)
   */
  slowMode: number;
  /**
   * 频道类型: 1 文字频道, 2 语音频道
   */
  type: number;
  /**
   * 针对角色在该频道的权限覆写规则组成的列表
   */
  permissionOverwrites: { roldId: number; allow: number; deny: number }[];
  /**
   * 针对用户在该频道的权限覆写规则组成的列表
   * TODO
   */
  permissionUsers: {
    allow: number;
    deny: number;
    user: BaseUser;
  }[];
  /**
   * 权限设置是否与分组同步, 1 or 0
   */
  permissionSync: number;
  /**
   * 语音服务器地址，`HOST:PORT`的格式
   */
  serverUrl?: string;
}
