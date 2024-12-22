import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Unified API Gateway for all services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log('API Gateway running on http://localhost:3000');
    console.log('Swagger docs available at http://localhost:3000/api');
  });
}
bootstrap();
