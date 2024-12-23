import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'apps/user/src/user.service';
import { Strategy } from 'passport-local';
// import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }
}
