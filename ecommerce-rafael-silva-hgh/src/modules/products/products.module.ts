import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Categories } from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
