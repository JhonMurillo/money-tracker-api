import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsUUID, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength, IsArray, ArrayNotEmpty, ArrayMinSize, ValidateNested, ArrayMaxSize, IsOptional, isDateString, IsDateString } from "class-validator";
import { PaginationDto } from "src/core/constants/pagination.constans";
import { IsFormatDate } from "src/core/utils/decorators/is-format-date.decorator";
import { CreateByExpenseDetailControllerDto } from "src/modules/expenses-detail/dtos/expense-detail.dto";
const { DATE_FORMAT = 'YYYY-MM' } = process.env;

export class CreateExpenseDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(7)
    @IsFormatDate(DATE_FORMAT)
    date: string;

    @IsNotEmpty()
    @IsDateString()
    fullDate: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalDetails: number;

    @IsNotEmpty()
    @IsNumber()
    totalDetailPaid: number;

    @IsNotEmpty()
    @IsNumber()
    totalDetailUnPaid: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string;

    @IsBoolean()
    isClosed: boolean;
}

export class CreateExpenseControllerDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(7)
    @IsFormatDate(DATE_FORMAT)
    date: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(2)
    @ValidateNested({ each: true })
    @Type(() => CreateByExpenseDetailControllerDto)
    expenseDetail?: Array<CreateByExpenseDetailControllerDto>;
}

export class CreateExpenseServiceDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    @MaxLength(7)
    @IsFormatDate(DATE_FORMAT)
    date: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(2)
    @ValidateNested({ each: true })
    @Type(() => CreateByExpenseDetailControllerDto)
    expenseDetail?: Array<CreateByExpenseDetailControllerDto>;

    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string;
}

export class ExpenseDto {
    id: string;
    date: string;
    total: number;
    isClosed: boolean;
    userId: string;
    // userId: Record<string, any>;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
}

export class SearchStipulationDto extends PartialType(PaginationDto) {
}
