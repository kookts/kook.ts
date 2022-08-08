import { BaseClient } from "../../../client/base.js";
import { KMessageEvent } from "../../../client/event-receiver/types.js";
import { BaseMessage } from "./base.js";


export class PrivateMessage extends BaseMessage {
  constructor(data: KMessageEvent, client: BaseClient) {
    super(data, client);
  }
}
