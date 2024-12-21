import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { RmqModule } from 'libs/common/src';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_MEMBERSHIP_QUEUE: joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
    RmqModule.register({ name: 'MEMBERSHIP' }),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
