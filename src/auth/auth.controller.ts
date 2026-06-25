import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'; // <-- Import AuthGuard để khóa API

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. API đăng ký (Yêu cầu 3)
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.username, body.password);
  }

  // 2. THÊM MỚI: API Đăng nhập để lấy Token (Yêu cầu 4)
  // URL gọi API: POST http://localhost:3000/auth/login
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  // 3. THÊM MỚI: API để kiểm tra xem Token có hoạt động không
  // URL gọi API: GET http://localhost:3000/auth/profile
  @UseGuards(AuthGuard('jwt')) // <-- Dòng này cực kỳ quan trọng! Nó như cái ổ khóa, bắt buộc phải có JWT mới vào được
  @Get('profile')
  getProfile(@Request() req) {
    // Nếu Token hợp lệ, JwtStrategy sẽ tự động giải mã chuỗi token 
    // và nạp thông tin user vào trong biến `req.user`
    return req.user;
  }
}