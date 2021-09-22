import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExpensesDetailController } from './controllers/expenses-detail.controller';
import { ExpenseDetail } from './models/expenses-detail.entity';
import { ExpensesDetailRepository } from './repositories/expenses-detail.repository';
import { ExpensesDetailService } from './services/expenses-detail.service';


@Module({
  imports: [
    SequelizeModule.forFeature([ExpenseDetail])
  ],
  providers: [
    ExpensesDetailService,
    ExpensesDetailRepository
  ],
  exports: [
    ExpensesDetailService
  ],
  controllers: [ExpensesDetailController]
})
export class ExpensesDetailModule { }
