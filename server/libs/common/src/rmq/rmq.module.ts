import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';
import * as joi from 'joi';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    const config = new ConfigService();

    const queue = config.get<string>(`RABBITMQ_${name}_QUEUE`);
    const url = config.get<string>('RABBITMQ_URL');
    return {
      module: RmqModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: joi.object({
            RABBITMQ_URL: joi.string().required(),
            RABBITMQ_GATEWAY_QUEUE: joi.string().required(),
          }),
          envFilePath: ['.env'],
        }),
        ClientsModule.registerAsync([
          {
            name,
            useFactory: () => ({
              transport: Transport.RMQ,
              options: {
                urls: [url],
                queue: queue,
              },
            }),

            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
