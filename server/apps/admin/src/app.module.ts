import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq.module';
import { AdminController } from './admin.controller';
import { AdminService } from './app.service';

@Module({
  imports: [RabbitMQModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
