/**
 * 私聊聊天会话
 */
export interface KUserChatSession {
  /**
   * 私信会话 Code
   */
  code: string;
  /**
   * 	上次阅读消息的时间
   */
  lastReadTime: number;
  /**
   * 最新消息时间
   */
  latestMsgTime: number;
  /**
   * 未读消息数
   */
  unreadCount: number;
  /**
   * 是否是好友
   */
  isFriend?: boolean;
  /**
   * 是否已屏蔽对方
   */
  isBlocked?: boolean;
  /**
   * 是否已被对方屏蔽
   */
  isTargetBlocked?: boolean;
  /**
   * 目标用户信息
   */
  targetInfo: {
    /**
     * 目标用户 ID
     */
    id: string;
    /**
     * 目标用户名
     */
    username: string;
    /**
     * 在线状态
     */
    online: boolean;
    /**
     * 头像图片链接
     */
    avatar: string;
  };
}
