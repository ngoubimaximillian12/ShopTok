import { Injectable } from '@nestjs/common';
import { sendEventToKafka } from './kafka.producer';

interface Event {
  userId: number;
  type: string; // view, like, add_to_cart, purchase, etc.
  productId?: number;
  timestamp: Date;
}

@Injectable()
export class EventsService {
  private events: Event[] = [];

  async logEvent(event: Event) {
    this.events.push(event);
    // TODO: Persist to DB (omitted here for brevity)
    await sendEventToKafka(event);
    return { success: true };
  }

  getEvents() {
    return this.events;
  }
}
