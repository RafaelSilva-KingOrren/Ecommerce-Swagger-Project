import { Injectable } from '@nestjs/common';
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
  }

  // async getProducts(): Promise<Products[]> {
  //   return this.productsRepository.find();
  // }

  async getProductsById(id: string): Promise<Products | null> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    return product;
  }
}
