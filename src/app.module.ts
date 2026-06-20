import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Hoặc link cloud database của nhóm
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'c_store_db',
      entities: [Category, Product, Order],
      synchronize: true, // Tự động tạo bảng dựa trên Entity cấu hình ở trên
    }),
    CategoryModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}