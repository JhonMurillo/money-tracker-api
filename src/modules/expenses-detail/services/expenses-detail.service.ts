import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { CreateExpenseDetailControllerDto, CreateExpenseDetailDto, ExpenseDetailDto, UpdateExpenseDetailDto } from "../dtos/expense-detail.dto";
import { ExpensesDetailRepository } from "../repositories/expenses-detail.repository";

@Injectable()
export class ExpensesDetailService {
    constructor(
        private sequelize: Sequelize,
        private readonly expenseDetailRepository: ExpensesDetailRepository,
    ) { }

    async create(expenseDetail: CreateExpenseDetailControllerDto, transaction): Promise<ExpenseDetailDto> {
        try {
            const expenseSaved = await this.expenseDetailRepository.create(
                expenseDetail,
                transaction
            );
            return expenseSaved['dataValues'];
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error creating the expense Detail`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, dto: UpdateExpenseDetailDto): Promise<void> {
        let updateInfo: [number, ExpenseDetailDto[]];

        if (!Object.keys(dto).length) {
            throw new HttpException('Columns no valid.', HttpStatus.BAD_REQUEST);
        }
        try {
            updateInfo = await this.expenseDetailRepository.update(id, dto);
        } catch (err) {
            throw new HttpException('Unexpected Error updating', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (updateInfo[0] === 0)
            throw new HttpException('The expense detail cannot be updated.', HttpStatus.INTERNAL_SERVER_ERROR);

    }

    async findAll(
        filters: Record<string, any>,
    ): Promise<{
        expensesDetail: ExpenseDetailDto[],
        total: number
    }> {
        try {
            const { rows: expensesDetail, count: total } = await this.expenseDetailRepository.findAll(filters);
            return { expensesDetail, total };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error searchong the expenses`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneById(
        id: string,
        withPass: boolean = false
    ): Promise<ExpenseDetailDto> {
        try {
            const expense = await this.expenseDetailRepository.findOne({ id });
            if (!expense) {
                throw new HttpException(`Expense Detail not found: ${id}`, HttpStatus.NOT_FOUND);
            }
            return expense;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error: ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

