import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // <-- 1. Import thêm JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // <-- 2. Inject JwtService vào đây để sử dụng
  ) {}

  // --- Hàm register (Đã làm ở Yêu cầu 3) giữ nguyên ---
  async register(username: string, pass: string): Promise<any> {
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username đã tồn tại!');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltOrRounds);
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    await this.usersRepository.save(newUser);
    const { password, ...result } = newUser;
    return { message: 'Đăng ký thành công', user: result };
  }

  // --- THÊM MỚI: Hàm login để sinh JWT ---
  async login(username: string, pass: string) {
    // 1. Tìm user trong CSDL theo username
    const user = await this.usersRepository.findOne({ where: { username } });

    // 2. Kiểm tra nếu có user và mật khẩu người dùng nhập trùng với mật khẩu băm trong CSDL
    if (user && (await bcrypt.compare(pass, user.password))) {
      
      // 3. Tạo payload (Thông tin đặc trưng của user này, sẽ được giấu bên trong Token)
      const payload = { username: user.username, sub: user.id };
      
      // 4. Tiến hành ký và tạo chuỗi JWT Token
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    // Nếu sai tài khoản hoặc mật khẩu thì báo lỗi 401 (Unauthorized)
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
  }
}