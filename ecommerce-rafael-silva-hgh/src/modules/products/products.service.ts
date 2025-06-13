import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/categories.entity';
import * as data from '../../../data.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async create(): Promise<string> {
    try {
      const categories: Categories[] = await this.categoriesRepository.find();
      const products: Products[] = data.map((element) => {
        const category: Categories | undefined = categories.find(
          (category) => element.category === category.name,
        );
        const newProduct = new Products();
        newProduct.name = element.name;
        newProduct.description = element.description;
        newProduct.price = element.price;
        newProduct.imgUrl = element?.imgUrl;
        newProduct.stock = element.stock;
        newProduct.category = category!;
        return newProduct;
      });
      await this.productsRepository.upsert(products, ['name']);
      return 'Products added successfully';
    } catch (error) {
      throw new BadRequestException('Error al crear los productos: ' + error.message);
    }
  }

  async getProducts(page: number = 1, limit: number = 10): Promise<Products[]> {
    try {
      const [products, total] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['category'],
      });

      if (products.length === 0) {
        throw new NotFoundException('No se encontraron productos');
      }

      return products;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener los productos: ' + error.message);
    }
  }

  async getProductsById(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: ['category'],
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el producto: ' + error.message);
    }
  }
}
