import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MembershipModule } from './membership.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MembershipModule,
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
  console.log(`Membership Microservice is running`);
}

bootstrap();
