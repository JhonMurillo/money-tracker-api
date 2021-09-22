import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateExpenseDetailDto, UpdateExpenseDetailDto, ExpenseDetailDto } from '../dtos/expense-detail.dto';
import { ExpenseDetail } from '../models/expenses-detail.entity';

@Injectable()
export class ExpensesDetailRepository {
    constructor(
        @InjectModel(ExpenseDetail)
        private readonly expenseModel: typeof ExpenseDetail,
    ) { }

    create(dto: CreateExpenseDetailDto, transaction: any = null): Promise<ExpenseDetailDto> {
        return this.expenseModel.create({ ...dto, isClosed: false }, { transaction });
    }

    update(
        id: string,
        columns: UpdateExpenseDetailDto,
        transaction: any = null,
    ): Promise<[number, ExpenseDetailDto[]]> {
        return this.expenseModel.update(columns, { where: { id }, transaction });
    }

    findAll(
        filters: Record<string, any>,
    ): Promise<{
        rows: ExpenseDetailDto[];
        count: number;
    }> {
        return this.expenseModel.findAndCountAll({
            where: filters
        });
    }

    findOne(
        where: Record<string, any>,
    ): Promise<ExpenseDetailDto> {
        return this.expenseModel.findOne({
            where: { ...where }
        });
    }
}