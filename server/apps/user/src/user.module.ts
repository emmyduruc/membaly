import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from 'libs/common/src';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_USER_QUEUE: joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
