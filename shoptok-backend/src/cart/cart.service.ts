import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      // Initialize cart if doesn't exist
      return this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } },
      });
    }
    return cart;
  }

  async addToCart(userId: number, productId: number) {
    const cart = await this.getCart(userId);

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    }

    return this.prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity: 1 },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.getCart(userId);
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });
    if (!existingItem) throw new NotFoundException('Item not in cart');

    if (existingItem.quantity > 1) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity - 1 },
      });
    }
    return this.prisma.cartItem.delete({ where: { id: existingItem.id } });
  }
}
