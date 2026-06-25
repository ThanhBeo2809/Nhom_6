import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  // Cột này sẽ lưu trữ mật khẩu đã được mã hóa (băm)
  @Column()
  password: string;
}