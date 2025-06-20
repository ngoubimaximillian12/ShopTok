import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';
import { sendEventToKafka } from '../common/kafka.producer';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  async logEvent(event: Event) {
    this.events.push(event);
    // Persist to DB logic should be here (omitted for brevity)
    await sendEventToKafka(event);
    return { success: true };
  }
}
