import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { RmqService } from 'libs/common/src';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('GATEWAY'));
  await app.startAllMicroservices();

  // const config = new DocumentBuilder()
  //   .setTitle('Memberly API Gateway')
  //   .setDescription('API documentation for all services')
  //   .setVersion('1.0')
  //   .addBearerAuth() // Optional: If you want to use JWT authentication
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  // await app.listen(3000, () => {
  //   console.log('API Gateway is running on http://localhost:3000');
  //   console.log(
  //     'Swagger documentation is available at http://localhost:3000/api',
  //   );
  // });
}
bootstrap();
