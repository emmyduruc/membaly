import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';
import { catchError, throwError, timeout } from 'rxjs';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT') private readonly paymentClientProxy: ClientProxy,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('process')
  @ApiOperation({
    summary: 'Process Payment',
    description: 'Processes a payment request.',
  })
  async processPayment(@Body() paymentData: PaymentDto) {
    return this.paymentClientProxy
      .send({ cmd: 'process-payment' }, paymentData)
      .pipe(
        timeout(5000),
        catchError((err) => {
          console.error('Error processing payment:', err);
          return throwError(() => new Error('Payment processing failed'));
        }),
      )
      .toPromise();
  }

  @Get('hello')
  @ApiOperation({
    summary: 'Payment Hello',
    description: 'Returns a hello message from the payment service.',
  })
  getHello() {
    return this.paymentService.getHello();
  }
}
