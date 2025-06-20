import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LiveShoppingService } from './live-shopping.service';

@Controller('live-shopping')
@UseGuards(JwtAuthGuard)
export class LiveShoppingController {
  constructor(private readonly liveShoppingService: LiveShoppingService) {}

  @Post('start')
  startStream(@Req() req) {
    return this.liveShoppingService.startLiveStream(req.user.userId);
  }

  @Post('end')
  endStream(@Body('streamId') streamId: string) {
    return this.liveShoppingService.endLiveStream(streamId);
  }
}
