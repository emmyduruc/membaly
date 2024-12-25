import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from 'libs/common/src';
import { PaymentProviderService } from './payment-provider/payment-provider.service';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_PAYMENT_QUEUE: joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
    RmqModule.register({ name: 'PAYMENT' }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProviderService],
})
export class PaymentModule {}
