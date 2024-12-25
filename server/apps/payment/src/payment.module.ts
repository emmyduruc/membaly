import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from 'libs/common/src';
import { PaymentProviderService } from './payment-provider/payment-provider.service';
import * as joi from 'joi';
import { UserService } from 'apps/user/src/user.service';
import { FirebaseAdminService } from 'apps/auth/firebase';
import { AuthService } from 'apps/auth/src/auth.service';
import { JwtService } from '@nestjs/jwt';

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
  providers: [
    PaymentService,
    PaymentProviderService,
    UserService,
    FirebaseAdminService,
    AuthService,
    JwtService,
  ],
})
export class PaymentModule {}
