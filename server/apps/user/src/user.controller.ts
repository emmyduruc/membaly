import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get-user' }) // This listens for the 'get-user' command
  async getUser(data: any) {
    return this.userService.getUser(data.userId); // Logic in the service layer
  }
}
