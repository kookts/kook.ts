import { BaseClient } from '../index.js';
import { parsePacket } from './packet-parser.js';
import { KEventPacket } from './types.js';

abstract class BaseReceiver {
  client: BaseClient;
  sn: number = 0;
  buffer: KEventPacket[] = [];
  constructor(client: BaseClient) {
    this.client = client;
  }
  abstract connect(): Promise<void>;

  protected onEventArrive(packet: KEventPacket): void {
    if (packet.sn === this.sn + 1) {
      this.sn += 1;
      // this.emit('message', cloneDeep(packet.d));
      this.eventProcess(packet);
      this.buffer.sort((a, b) => a.sn - b.sn);
      while (this.buffer.length > 0 && this.buffer[0].sn < this.sn + 1) {
        this.buffer.shift();
      }
      while (this.buffer.length > 0 && this.buffer[0].sn === this.sn + 1) {
        const packet = this.buffer.shift() as KEventPacket;
        // this.emit('message', cloneDeep(packet.d));
        this.eventProcess(packet);
        while (this.buffer.length > 0 && this.buffer[0].sn < this.sn + 1) {
          this.buffer.shift();
        }
      }
    } else if (packet.sn > this.sn + 1) {
      this.buffer.push(packet);
    }
  }

  protected eventProcess(packet: KEventPacket): void {
    this.client.emit('raw', packet.d);
    const result = parsePacket(packet.d, this.client);
    console.log(result)
    // this.client.emit(result.type, result);
  }
}

export { BaseReceiver };
