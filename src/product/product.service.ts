import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(data: Partial<Product>) { return this.repo.save(data); }
  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  async update(id: number, data: Partial<Product>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  remove(id: number) { return this.repo.delete(id); }
}