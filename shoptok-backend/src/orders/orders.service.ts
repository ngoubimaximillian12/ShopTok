import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number) {
    // Fetch user cart and its items
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Calculate total price
    const total = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );

    // Create new order with order items
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    // Clear user cart after order
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
