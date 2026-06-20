import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(data: Partial<Category>) { return this.repo.save(data); }
  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  async update(id: number, data: Partial<Category>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  remove(id: number) { return this.repo.delete(id); }
}