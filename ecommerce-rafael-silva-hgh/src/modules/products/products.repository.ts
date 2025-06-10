import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Bananas',
      description: 'Bananas con chocolate',
      price: 10,
      stock: true,
      imageUrl: 'https://www.bananas.com',
    },
    {
      id: 2,
      name: 'Pozole',
      description: 'Pozole con carne',
      price: 10,
      stock: true,
      imageUrl: 'https://www.pozole.com',
    },
    {
      id: 3,
      name: 'Papitas',
      description: 'Papitas con queso',
      price: 10,
      stock: true,
      imgUrl: 'https://www.papitas.com',
    },
  ];

  async getProducts() {
    return this.products;
  }
  async getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
