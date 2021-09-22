import { Module } from '@nestjs/common';
import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './controllers/expenses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from './models/expenses.entity';
import { ExpensesRepository } from './repositories/expenses.repository';
import { ExpensesProviders } from './repositories/expenses.provider';
import { ExpensesDetailModule } from '../expenses-detail/expenses-detail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Expense]),
    ExpensesDetailModule
  ],
  providers: [
    ExpensesService,
    ExpensesRepository,
    ...ExpensesProviders
  ],
  controllers: [ExpensesController]
})
export class ExpensesModule { }
