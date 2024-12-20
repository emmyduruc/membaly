import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AdminService {
  constructor(
    private readonly authClient: ClientProxy, // Inject Auth Client
    private readonly analyticsClient: ClientProxy, // Inject Analytics Client
  ) {}

  async getAllUsers() {
    return this.authClient.send({ cmd: 'get-all-users' }, {});
  }

  async trackEvent(eventData: any) {
    return this.analyticsClient.emit('track-event', eventData);
  }
}
