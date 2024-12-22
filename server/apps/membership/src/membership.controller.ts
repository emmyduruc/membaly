// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { MembershipService } from './membership.service';

// @Controller()
// export class MembershipController {
//   constructor(private readonly membershipService: MembershipService) {}

//   @MessagePattern({ cmd: 'list-memberships' }) // This listens for the 'list-memberships' command
//   async listMemberships() {
//     return this.membershipService.listMemberships(); // Logic in the service layer
//   }

//   @MessagePattern({ cmd: 'get-hello' })
//   async getHello() {
//     return this.membershipService.getHello();
//   }
// }
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { timeout } from 'rxjs';

@ApiTags('Membership')
@Controller('membership')
export class MembershipController {
  constructor(
    @Inject('MEMBERSHIP') private readonly membershipService: ClientProxy,
  ) {}

  @Get('list')
  @ApiOperation({
    summary: 'List Memberships',
    description: 'Lists all available memberships.',
  })
  async listMemberships() {
    try {
      return await this.membershipService
        .send({ cmd: 'list-memberships' }, {})
        .pipe(timeout(5000))
        .toPromise();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  @Get('hello')
  @ApiOperation({
    summary: 'Membership Hello',
    description: 'Returns a hello message from the membership service.',
  })
  getHello() {
    return this.membershipService
      .send({ cmd: 'get-hello' }, {})
      .pipe(timeout(5000))
      .toPromise();
  }
}
