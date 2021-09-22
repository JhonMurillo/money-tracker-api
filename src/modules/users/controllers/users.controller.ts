import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(
        @Request() req,
    ): Promise<{ users: UserDto[], total: number }> {
        return await this.usersService.findAll({}, true);
    }

    @Get('/:id')
    async findById(
        @Param('id') id: string,
    ): Promise<UserDto> {
        return await this.usersService.findOneById(id, true);
    }

    @Get('/:email/byEmail')
    async findByEmail(
        @Param('email') email: string,
    ): Promise<UserDto> {
        return await this.usersService.findOneByEmail(email, true);
    }

    @Post()
    async create(
        @Body() user: CreateUserDto
    ): Promise<UserDto> {
        return await this.usersService.create(user);
    }
}
