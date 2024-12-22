import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { timeout } from 'rxjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject('USER') private readonly userService: ClientProxy) {}

  @Get('get')
  @ApiOperation({
    summary: 'Get User Data',
    description: 'Retrieves user information.',
  })
  getUser() {
    return this.userService
      .send({ cmd: 'get-user' }, {})
      .pipe(timeout(5000))
      .toPromise();
  }
}
