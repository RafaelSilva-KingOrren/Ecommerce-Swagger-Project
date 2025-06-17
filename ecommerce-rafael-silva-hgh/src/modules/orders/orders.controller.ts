import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from '../orders/order.service';
import { CreateOrderDTO } from './orderDTO';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() createOrderDTO: CreateOrderDTO) {
    const { userId, products } = createOrderDTO;
    return this.ordersService.addOrder(userId, products);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
