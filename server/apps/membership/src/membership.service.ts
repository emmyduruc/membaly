import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipService {
  getHello(): string {
    return 'Hello World!';
  }
  async listMemberships() {
    return [
      { id: 1, name: 'Premium Membership', price: 100 },
      { id: 2, name: 'Basic Membership', price: 50 },
    ];
  }
}
