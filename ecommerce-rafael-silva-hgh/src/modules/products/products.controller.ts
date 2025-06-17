import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductsById(id);
  }
}
