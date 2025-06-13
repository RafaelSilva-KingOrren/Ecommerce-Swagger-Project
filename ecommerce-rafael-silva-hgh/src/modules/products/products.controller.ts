import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  getProducts() {
    return this.productsService.create();
  }

  @Get()
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productsService.getProducts(+page, +limit);
  }

  @Get(':id')
  getProductsById(@Param('id') id: string) {
    return this.productsService.getProductsById(id);
  }
}
