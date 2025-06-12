import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../../data.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addCategory() {
    const categoryNames = new Set(data.map((element) => element.category));
    const categoriesArray = Array.from(categoryNames);
    const categories = categoriesArray.map((category) => ({ name: category }));

    await this.categoriesRepository.upsert(categories, ['name']);
    console.log('GET /categories/seeder llamado');
    return 'This action adds a new category';
  }

  getCategories() {
    return this.categoriesRepository.find();
  }
}
