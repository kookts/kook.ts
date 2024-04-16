import { BaseClient } from '../../client/base.js';
import { KMessageEvent } from '../../client/event-receiver/types.js';
import { BaseEvent, BaseEventFactory } from './base.js';

export class SystemEvent extends BaseEvent {}

export class SystemEventFactory extends BaseEventFactory(SystemEvent) {
  static create(raw: KMessageEvent, client: BaseClient) {
    let event = super.create(raw, client);
    return event;
  }
}
