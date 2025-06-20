import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Req() req) {
    return this.ordersService.createOrder(req.user.userId);
  }

  @Get()
  async getUserOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.userId);
  }
}
