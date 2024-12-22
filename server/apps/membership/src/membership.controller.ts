import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MembershipService } from './membership.service';

@Controller()
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @MessagePattern({ cmd: 'list-memberships' }) // This listens for the 'list-memberships' command
  async listMemberships() {
    return this.membershipService.listMemberships(); // Logic in the service layer
  }

  @MessagePattern({ cmd: 'get-hello' })
  async getHello() {
    return this.membershipService.getHello();
  }
}
