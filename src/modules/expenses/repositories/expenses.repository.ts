import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { literal, Op } from 'sequelize';
import { ExpenseDetail } from 'src/modules/expenses-detail/models/expenses-detail.entity';
import { User } from 'src/modules/users/models/user.entity';
import { EXPENSE_REPOSITORY } from '../../../core/constants';
import { CreateExpenseDto, UpdateExpenseDto, ExpenseDto } from '../dtos/expense.dto';
import { Expense } from '../models/expenses.entity';

@Injectable()
export class ExpensesRepository {
    constructor(
        @Inject(EXPENSE_REPOSITORY)
        private readonly expenseModel: typeof Expense,
    ) { }

    create(dto: CreateExpenseDto, transaction: any = null): Promise<ExpenseDto> {
        return this.expenseModel.create(dto, { transaction });
    }

    update(
        id: string,
        columns: UpdateExpenseDto,
        transaction: any = null,
    ): Promise<[number, ExpenseDto[]]> {
        return this.expenseModel.update(columns, { where: { id }, transaction });
    }

    findAll(
        filters: Record<string, any>,
        pagination: Record<string, any>,
    ): Promise<{
        rows: Expense[];
        count: number;
    }> {
        if (pagination.search && pagination.search.trim() !== "''" && pagination.search.trim() !== '') {
            filters['date'] = { [Op.iLike]: literal(`'%${pagination.search.trim()}%'`) };
        }

        return this.expenseModel.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'createdAt', 'updatedAt']
                }
            ],
            where: filters,
            offset: (+pagination.page - 1) * +pagination.pageSize,
            limit: +pagination.pageSize,
            order: [[pagination.sortValue, pagination.sortType]]
        });
    }

    findOne(
        where: Record<string, any>,
    ): Promise<ExpenseDto> {
        return this.expenseModel.findOne({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'createdAt', 'updatedAt']
                },
                {
                    model: ExpenseDetail,
                    attributes: ['description', 'value', 'isPaid', 'createdAt', 'updatedAt']
                },
            ],
            where: { ...where }
        });
    }
}