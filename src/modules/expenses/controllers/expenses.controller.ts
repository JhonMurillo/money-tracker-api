import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateExpenseControllerDto, ExpenseDto, SearchStipulationDto } from '../dtos/expense.dto';
import { ExpensesService } from '../services/expenses.service';

@Controller('expenses')
@ApiTags('Expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Get()
    async findAll(
        @Request() req,
        @Query() query: SearchStipulationDto
    ): Promise<{ expenses: ExpenseDto[], total: number }> {
        return await this.expensesService.findAll({
            userId: req.user.id,
            ...query
        });
    }

    @Get('/:id')
    async findById(
        @Param('id') id: string,
    ): Promise<ExpenseDto> {
        return await this.expensesService.findOneById(id);
    }

    @Post()
    async create(
        @Body() expense: CreateExpenseControllerDto,
        @Request() req,
    ): Promise<ExpenseDto> {
        const userId = req.user.id;
        return await this.expensesService.create({ ...expense, userId });
    }
}
