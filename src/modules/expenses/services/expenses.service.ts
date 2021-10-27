import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from "moment-timezone";
import { Sequelize } from 'sequelize-typescript';
import { ExpensesDetailService } from 'src/modules/expenses-detail/services/expenses-detail.service';
import { CreateExpenseServiceDto, ExpenseDto, UpdateExpenseDto } from '../dtos/expense.dto';
import { ExpensesRepository } from '../repositories/expenses.repository';
const { DATE_FORMAT = 'YYYY-MM' } = process.env;

@Injectable()
export class ExpensesService {
    constructor(
        private sequelize: Sequelize,
        private readonly expenseRepository: ExpensesRepository,
        private readonly expensesDetailService: ExpensesDetailService,
    ) { }

    async create(expense: CreateExpenseServiceDto): Promise<ExpenseDto> {
        const transaction = await this.sequelize.transaction();
        try {
            const existExpense = await this.expenseRepository.findOne({ date: expense.date, userId: expense.userId });
            if (existExpense) {
                throw new HttpException(`For this date ${expense.date},  already exists for this user`, HttpStatus.BAD_REQUEST);
            }

            const total = expense.expenseDetail.reduce((acc, obj) => { return acc + obj.value; }, 0);
            const isClosed = expense.expenseDetail.every(({ isPaid }) => isPaid);
            const totalDetails = expense.expenseDetail.length;
            const totalDetailPaid = expense.expenseDetail.filter(({ isPaid }) => isPaid).length;
            const totalDetailUnPaid = totalDetails - totalDetailPaid;
            const fullDate = moment(expense.date, DATE_FORMAT).toDate();
            
            const expenseSaved = await this.expenseRepository.create(
                {
                    date: expense.date,
                    userId: expense.userId,
                    total,
                    isClosed,
                    totalDetailPaid,
                    totalDetailUnPaid,
                    totalDetails,
                    fullDate
                },
                transaction
            );

            const details = expense.expenseDetail.map(item => {
                return { ...item, expenseId: expenseSaved.id }
            });

            await this.expensesDetailService.bulkCreate(
                details,
                transaction
            );
            await transaction.commit();
            return expenseSaved['dataValues'];
        } catch (error) {
            await transaction.rollback();
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error creating the expense`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, dto: UpdateExpenseDto): Promise<void> {
        let updateInfo: [number, ExpenseDto[]];

        if (!Object.keys(dto).length) {
            throw new HttpException('Columns no valid.', HttpStatus.BAD_REQUEST);
        }
        try {
            updateInfo = await this.expenseRepository.update(id, dto);
        } catch (err) {
            throw new HttpException('Unexpected Error updating', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (updateInfo[0] === 0)
            throw new HttpException('The expense cannot be updated.', HttpStatus.INTERNAL_SERVER_ERROR);

    }

    async findAll(
        filters: Record<string, any>,
    ): Promise<{
        expenses: ExpenseDto[],
        total: number
    }> {
        try {
            const {
                userId,
                sortType,
                sortValue,
                search,
                page,
                pageSize,
            } = filters;

            const { rows: expenses, count: total } = await this.expenseRepository.findAll(
                {
                    userId
                },
                {
                    sortType,
                    sortValue,
                    search,
                    page,
                    pageSize,
                }
            );
            return { expenses, total };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error searching the expenses`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneById(
        id: string,
        withPass: boolean = false
    ): Promise<ExpenseDto> {
        try {
            const expense = await this.expenseRepository.findOne({ id });
            if (!expense) {
                throw new HttpException(`Expense not found: ${id}`, HttpStatus.NOT_FOUND);
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
