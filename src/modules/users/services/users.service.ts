import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserDto, CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {

    constructor(
        private sequelize: Sequelize,
        private readonly userRepository: UsersRepository,
    ) { }

    async create(user: CreateUserDto): Promise<UserDto> {
        const transaction = await this.sequelize.transaction();
        try {
            const existUser = await this.userRepository.findOne({ email: user.email });
            if (existUser) {
                throw new HttpException(`Email ${user.email} already exists`, HttpStatus.BAD_REQUEST);
            }
            const userSaved = await this.userRepository.create(user, transaction);
            const { password, ...userWithoutPass } = userSaved['dataValues'];
            await transaction.commit();
            return userWithoutPass;
        } catch (error) {
            await transaction.rollback();
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error creating the user`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, dto: UpdateUserDto): Promise<void> {
        let updateInfo: [number, UserDto[]];

        if (!Object.keys(dto).length) {
            throw new HttpException('Columns no valid.', HttpStatus.BAD_REQUEST);
        }
        try {
            updateInfo = await this.userRepository.update(id, dto);
        } catch (err) {
            throw new HttpException('Unexpected Error updating', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (updateInfo[0] === 0)
            throw new HttpException('The user cannot be updated.', HttpStatus.INTERNAL_SERVER_ERROR);

    }

    async findAll(
        filters: Record<string, any>,
        withPass: boolean = false
    ): Promise<{
        users: UserDto[],
        total: number
    }> {
        try {
            const { rows: users, count: total } = await this.userRepository.findAll(filters, withPass);
            return { users, total };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error searchong the users`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneByEmail(
        email: string,
        withPass: boolean = false
    ): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({ email, isActived: true }, withPass)
            if (!user) {
                throw new HttpException(`User not found: ${email}`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error: ${email}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneById(
        id: string,
        withPass: boolean = false
    ): Promise<UserDto> {
        try {
            const user = await this.userRepository.findOne({ id, isActived: true }, withPass);
            if (!user) {
                throw new HttpException(`User not found: ${id}`, HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(`Unexpected error: ${id}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}