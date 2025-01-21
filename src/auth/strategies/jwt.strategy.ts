import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/core/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.getByIdWithPermissions(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token.');
    }

    const permissions = user.roles
      .flatMap((role) => role.permissions)
      .filter(
        (permission, index, self) =>
          index === self.findIndex((p) => p.key === permission.key),
      );

    return {
      userId: user.id,
      email: user.email,
      permissions: permissions.map((permission) => permission.key),
    };
  }
}
