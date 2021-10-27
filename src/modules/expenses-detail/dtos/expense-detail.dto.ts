import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsUUID, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength, IsOptional } from "class-validator";

export class CreateExpenseDetailDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    value: number;

    @IsOptional()
    @IsString()
    @IsUUID('4')
    expenseId?: string;

    @IsBoolean()
    isPaid: boolean;
}

export class CreateByExpenseDetailControllerDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    value: number;

    @IsBoolean()
    isPaid: boolean;
}

export class CreateExpenseDetailControllerDto  {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    value: number;

    @IsBoolean()
    isPaid: boolean;

    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    expenseId: string;
}

export class ExpenseDetailDto {
    id: string;
    description: string;
    value: number;
    expenseId: string;
    isPaid: boolean;
    // userId: Record<string, any>;
}

export class UpdateExpenseDetailDto extends PartialType(CreateExpenseDetailDto) {
}