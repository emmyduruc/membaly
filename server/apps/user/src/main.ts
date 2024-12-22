import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
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
  await app.listen();
  console.log(`User Microservice is running`);
}

bootstrap();
