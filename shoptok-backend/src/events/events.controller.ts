import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async logEvent(@Body() event: Event) {
    return this.eventsService.logEvent(event);
  }
}
