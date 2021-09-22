import { EXPENSE_REPOSITORY } from '../../../core/constants';
import { Expense } from '../models/expenses.entity';

export const ExpensesProviders = [{
    provide: EXPENSE_REPOSITORY,
    useValue: Expense,
}];