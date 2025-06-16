import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/modules/products/products.entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './file.upload.repository';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}
  async uploadImage(file: Express.Multer.File, productId: any) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }
    const uploadResponse = await this.fileUploadRepository.uploadImage(file);
    await this.productsRepository.update(product.id, {
      imgUrl: uploadResponse.url,
    });
    return await this.productsRepository.findOneBy({ id: productId });
  }
}
