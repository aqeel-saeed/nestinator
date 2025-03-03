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
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationDto } from './dto/resend-verification-code.dto';
import { BaseController } from '../base/base.controller';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const res = await this.authService.register(registrationData);
    return this.successResponse('signed up successfully.', res);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const res = await this.authService.login(loginData);

    return this.successResponse('Logged in successfully.', res);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const reqUser = req.user;
    return this.successResponse(
      'User profile retrieved successfully.',
      reqUser,
    );
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
    return this.successResponse('Code sent successfully');
  }
}
