import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { pipe, timeout } from 'rxjs';

@Controller('gateway')
export class GatewayController {
  constructor(
    @Inject('AUTH') private readonly authService: ClientProxy,
    @Inject('PAYMENT') private readonly paymentService: ClientProxy,
    @Inject('MEMBERSHIP') private readonly membershipService: ClientProxy,
  ) {}

  @Get('/')
  getRoot() {
    return { message: 'Welcome to the API Gateway!' };
  }

  @Post('auth/login')
  login(@Body() credentials: any) {
    return this.authService.send({ cmd: 'login' }, credentials);
  }

  @Post('payment/process')
  processPayment(@Body() paymentData: any) {
    return this.paymentService.send({ cmd: 'process-payment' }, paymentData);
  }

  @Get('membership/list')
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

  @Get('membership/hello')
  getHello() {
    return this.membershipService
      .send({ cmd: 'get-hello' }, {})
      .pipe(timeout(5000))
      .toPromise();
  }
}
