import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { AuthModule, RmqModule } from 'libs/common/src';
import { AuthController } from 'apps/auth/src/auth.controller';
import { UserController } from 'apps/user/src/user.controller';
import { PaymentController } from 'apps/payment/src/payment.controller';
import { MembershipController } from 'apps/membership/src/membership.controller';
import { PaymentModule } from 'apps/payment/src/payment.module';
import { PaymentService } from 'apps/payment/src/payment.service';
import { FirebaseAdminService } from 'apps/auth/firebase';
import { UserService } from 'apps/user/src/user.service';
import { AuthService } from 'apps/auth/src/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MembershipService } from 'apps/membership/src/membership.service';
import { AnalyticsService } from 'apps/analytics/src/analytics.service';
import { PaymentProviderService } from 'apps/payment/src/payment-provider/payment-provider.service';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        secretOrPrivateKey: configService.get('JWT_SECRET_OR_PRIVATE_KEY'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
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
  providers: [
    GatewayService,
    PaymentService,
    FirebaseAdminService,
    UserService,
    AuthService,
    JwtService,
    MembershipService,
    AnalyticsService,
    PaymentProviderService,
  ],
})
export class GatewayModule {}
