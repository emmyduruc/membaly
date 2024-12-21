import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { RmqModule } from 'libs/common/src';

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
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
