import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  getUser(userId: string): string {
    return `User with id ${userId}`;
  }
}
