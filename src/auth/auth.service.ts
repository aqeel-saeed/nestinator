import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/core/configurations/database/postgres-error-code.enum';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../modules/users/users.service';
import { User } from '../modules/users/entities/user.entity';
import { generateRandomCode } from '../shared/utils/utils';
import { MailService } from '../core/mail/mail.service';
import { VerificationMailDto } from '../core/mail/templates/verification-code.mail-template';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(loginData: LoginDto) {
    const user = await this.validateUser(loginData.email, loginData.password);
    return this.makeToken(user);
  }

  async makeToken(user: User) {
    const payload: TokenPayload = {
      email: user.email,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  public async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = (await this.usersService.create({
        ...registerData,
        password: hashedPassword,
      })) as User;

      await this.sendVerificationCode(createdUser.email);

      return { message: 'Verification code sent to your email' };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyUser(email: string, code: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (user.verificationCode !== code)
      throw new BadRequestException('Invalid verification code');

    await this.usersService.update(user.id, {
      isVerified: true,
      verificationCode: null,
    });

    return { message: 'User verified successfully' };
  }

  async sendVerificationCode(email: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verificationCode = generateRandomCode(4);
    await this.usersService.update(user.id, { verificationCode });

    const mailData = new VerificationMailDto(user.email, verificationCode);
    this.mailService.sendMail(mailData);

    console.log(`Verification code for ${user.email}: ${verificationCode}`);
  }
}
