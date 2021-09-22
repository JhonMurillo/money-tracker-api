import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesDetailService } from './expenses-detail.service';

describe('ExpensesDetailService', () => {
  let service: ExpensesDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpensesDetailService],
    }).compile();

    service = module.get<ExpensesDetailService>(ExpensesDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
