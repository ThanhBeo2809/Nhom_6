import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  create(data: Partial<Order>) { return this.repo.save(data); }
  findAll() { return this.repo.find(); }
  findOne(id: number) { return this.repo.findOneBy({ id }); }
  async update(id: number, data: Partial<Order>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }
  remove(id: number) { return this.repo.delete(id); }
}