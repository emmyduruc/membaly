import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'analytics_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'MEMBERSHIP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'membership_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'payment_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'admin_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
