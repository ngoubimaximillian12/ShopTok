import { Module } from '@nestjs/common';
import { LiveShoppingService } from './live-shopping.service';
import { LiveShoppingController } from './live-shopping.controller';

@Module({
  providers: [LiveShoppingService],
  controllers: [LiveShoppingController],
})
export class LiveShoppingModule {}
