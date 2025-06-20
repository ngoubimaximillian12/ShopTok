import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post()
  addToCart(@Req() req, @Body('productId') productId: number) {
    return this.cartService.addToCart(req.user.userId, productId);
  }

  @Delete(':productId')
  removeFromCart(@Req() req, @Param('productId') productId: number) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }
}
