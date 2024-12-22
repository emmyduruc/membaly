import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  @MessagePattern({ cmd: 'process-payment' })
  async processPayment(
    @Payload() paymentData: { userid: string; cost: number },
  ) {
    console.log('Processing payment for user:', paymentData.userid);

    return { success: true, message: 'Payment processed successfully' };
  }
  getHello(): string {
    return 'Hello World!';
  }
}
