import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class _202108071702Active_UsersService {
    constructor(private usersService: UsersService) { }
    async up(): Promise<void> {
        const users = await this.usersService.findAll({});
        for (const user of users.users) {
            const id = user.id;
            const dto = { isActived: true, ...user }
            await this.usersService.update(id, dto);
        }
    }
}