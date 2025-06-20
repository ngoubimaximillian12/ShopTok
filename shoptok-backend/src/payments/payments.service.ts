import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

  constructor(private prisma: PrismaService) {}

  async createCheckoutSession(userId: number, orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order || order.userId !== userId) {
      throw new BadRequestException('Invalid order');
    }

    const line_items = order.orderItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout-cancel`,
      metadata: { orderId: order.id.toString(), userId: userId.toString() },
    });

    return { url: session.url };
  }

  async handleStripeWebhook(event: any) {
    // Simplified webhook handling
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = parseInt(session.metadata.orderId);

      // Mark order as paid
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });
    }
    return { received: true };
  }
}
