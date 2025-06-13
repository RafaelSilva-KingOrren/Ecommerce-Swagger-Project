import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../orders/order.service';
import { CreateOrderDTO } from './orderDTO';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDTO: CreateOrderDTO) {
    const { userId, products } = createOrderDTO;
    return this.ordersService.create(userId, products);
  }
}
