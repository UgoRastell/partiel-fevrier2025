import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Partial<Product>): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
