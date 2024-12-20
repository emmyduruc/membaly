import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RabbitMQ Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672', 'amqp://localhost:5673'],
      queue: 'memberly_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Memberly API Gateway')
    .setDescription('API documentation for all services')
    .setVersion('1.0')
    .addBearerAuth() // Optional: If you want to use JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(3000, () => {
    console.log('API Gateway is running on http://localhost:3000');
    console.log(
      'Swagger documentation is available at http://localhost:3000/api',
    );
  });
}
bootstrap();
