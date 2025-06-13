import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Orders } from './order.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { Products } from '../products/products.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Orders, OrderDetails, Products])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
