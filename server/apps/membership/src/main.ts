import { NestFactory } from '@nestjs/core';
import { MembershipModule } from './membership.module';

async function bootstrap() {
  const app = await NestFactory.create(MembershipModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
