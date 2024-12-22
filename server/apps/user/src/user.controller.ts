import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { RolesGuard } from 'apps/auth/src/guards/roles.guard';
import { Role } from '@app/common/validators';
import { Roles } from '@app/common/decorator/roles.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(@Inject('USER') private readonly userService: ClientProxy) {}

  @Get('get')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get User Data',
    description: 'Retrieves user information.',
  })
  async getUser() {
    try {
      const response = await this.userService
        .send({ cmd: 'get-user' }, {})
        .pipe(timeout(5000))
        .toPromise();

      return response;
    } catch (err) {
      throw new Error(`Failed to fetch user data: ${err.message}`);
    }
  }
}
