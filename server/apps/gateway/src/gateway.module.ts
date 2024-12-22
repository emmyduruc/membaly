import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AuthModule, RmqModule } from 'libs/common/src';
import { AuthController } from 'apps/auth/src/auth.controller';
import { UserController } from 'apps/user/src/user.controller';
import { PaymentController } from 'apps/payment/src/payment.controller';
import { MembershipController } from 'apps/membership/src/membership.controller';
import { PaymentModule } from 'apps/payment/src/payment.module';
import { PaymentService } from 'apps/payment/src/payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_GATEWAY_QUEUE: joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
    RmqModule.register({ name: 'GATEWAY' }),
    RmqModule.register({ name: 'AUTH' }),
    RmqModule.register({ name: 'PAYMENT' }),
    RmqModule.register({ name: 'MEMBERSHIP' }),
    RmqModule.register({ name: 'USER' }),
    RmqModule.register({ name: 'ANALYTICS' }),
    AuthModule,
    PaymentModule,
  ],
  controllers: [
    AuthController,
    UserController,
    PaymentController,
    MembershipController,
    GatewayController,
  ],
  providers: [GatewayService, PaymentService],
})
export class GatewayModule {}
