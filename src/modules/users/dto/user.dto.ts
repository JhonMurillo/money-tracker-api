import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(250)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class UserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsString()
    id: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsBoolean()
    isActived: boolean = true;
}