import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UsePipes,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentDto } from './payment.dto';
import { catchError, throwError, timeout } from 'rxjs';
import { PaymentService } from './payment.service';
import { JoiValidationPipe } from '@app/common/validators/joinValidationPipe';
import { createPaymentSchema } from '@app/common/validators/payment.schema';
import {
  CreatePaymentDto,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './dto/payment.dto';
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from '@app/common/validators/subscription.schema';
import { Roles } from '@app/common/decorator/roles.decorator';
import { Role } from '@app/common/validators';
import { RolesGuard } from 'apps/auth/src/guards/roles.guard';

@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.USER)
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('PAYMENT') private readonly paymentClientProxy: ClientProxy,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create Payment' })
  @UsePipes(new JoiValidationPipe(createPaymentSchema))
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Create Subscription' })
  @UsePipes(new JoiValidationPipe(createSubscriptionSchema))
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.paymentService.createSubscription(createSubscriptionDto);
  }

  @Patch('update-subscription')
  @ApiOperation({ summary: 'Update Subscription' })
  @UsePipes(new JoiValidationPipe(updateSubscriptionSchema))
  async updateSubscription(
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.paymentService.updateSubscription(updateSubscriptionDto);
  }

  @Delete('cancel-subscription/:subscriptionId')
  @ApiOperation({ summary: 'Cancel Subscription' })
  async cancelSubscription(@Body('subscriptionId') subscriptionId: string) {
    return this.paymentService.cancelSubscription(subscriptionId);
  }

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
