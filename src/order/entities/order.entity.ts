import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Khách lẻ' })
  customer_name: string;

  @Column('decimal')
  total_amount: number;

  @CreateDateColumn()
  created_at: Date;
}
