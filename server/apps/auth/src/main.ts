import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_MEMBERSHIP_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose']);

  await app.listen();
  console.log(`Analytics Microservice is running with HTTP support`);
}

bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AuthModule);
//   const rmqService = app.get<RmqService>(RmqService);
//   app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
//   app.useGlobalPipes(new ValidationPipe());
//   const configService = app.get(ConfigService);
//   await app.startAllMicroservices();
//   await app.listen(configService.get('PORT'));
// }
// bootstrap();
