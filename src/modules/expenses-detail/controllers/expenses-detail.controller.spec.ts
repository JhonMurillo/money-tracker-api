import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesDetailController } from './expenses-detail.controller';

describe('ExpensesDetailController', () => {
  let controller: ExpensesDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesDetailController],
    }).compile();

    controller = module.get<ExpensesDetailController>(ExpensesDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
