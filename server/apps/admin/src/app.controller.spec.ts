import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './app.service';

describe('AppController', () => {
  let appController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    appController = app.get<AdminController>(AdminController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
