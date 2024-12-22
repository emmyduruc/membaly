import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        RABBITMQ_URL: joi.string().required(),
        RABBITMQ_USER_QUEUE: joi.string().required(),
      }),
      envFilePath: ['.env'],
    }),
    RmqModule.register({ name: 'ANALYTICS' }),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
