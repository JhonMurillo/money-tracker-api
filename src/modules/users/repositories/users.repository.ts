import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, USER_ATTRS } from '../../../core/constants';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userModel: typeof User,
    ) { }

    create(dto: CreateUserDto, transaction: any = null): Promise<UserDto> {
        return this.userModel.create({ isActived: true, ...dto }, { transaction });
    }

    update(
        id: string,
        columns: UpdateUserDto,
        transaction: any = null,
    ): Promise<[number, UserDto[]]> {
        return this.userModel.update(columns, { where: { id }, transaction });
    }

    findAll(
        filters: Record<string, any>,
        withPass = false
    ): Promise<{
        rows: User[];
        count: number;
    }> {
        return this.userModel.findAndCountAll({
            attributes: this.getAttrs(withPass),
            where: filters
        });
    }

    findOne(
        where: Record<string, any>,
        withPass: boolean = false
    ): Promise<UserDto> {


        return this.userModel.findOne({
            attributes: this.getAttrs(withPass),
            where: { ...where }
        });
    }

    private getAttrs(withPass: boolean = false) {
        return withPass ? [...USER_ATTRS, 'password'] : USER_ATTRS;
    }

}