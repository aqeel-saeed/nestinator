import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/core/configurations/database/postgres-error-code.enum';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../modules/users/users.service';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided1',
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
        'Wrong credentials provided2',
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
      access_token: await this.jwtService.sign(payload),
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
      return this.makeToken(createdUser);
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
}
