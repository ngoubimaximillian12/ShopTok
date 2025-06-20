import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Req() req, @Body() body: { orderId: number }) {
    return this.paymentsService.createCheckoutSession(req.user.userId, body.orderId);
  }

  @Post('webhook')
  async handleWebhook(@Body() event: any) {
    return this.paymentsService.handleStripeWebhook(event);
  }
}
