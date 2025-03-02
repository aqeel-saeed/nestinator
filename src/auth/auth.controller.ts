import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { apiResponse } from 'src/shared/utils/utils';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationDto } from './dto/resend-verification-code.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const res = await this.authService.register(registrationData);
    return apiResponse(res, 'signed up successfully.');
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const res = await this.authService.login(loginData);
    console.log('result is:', res);

    return apiResponse(res, 'Logged in successfully.');
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const reqUser = req.user;
    return apiResponse(reqUser, 'User profile retrieved successfully.');
  }

  @Post('verify')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto.email, verifyUserDto.code);
  }

  @Post('resend-verification')
  async resendVerification(
    @Body() resendVerificationDto: ResendVerificationDto,
  ) {
    await this.authService.sendVerificationCode(resendVerificationDto.email);
    return apiResponse(null, 'Code sent successfully');
  }
}
