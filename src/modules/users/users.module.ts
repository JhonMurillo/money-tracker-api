import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersProviders } from './repositories/users.provider';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  providers: [
    UsersService,
    UsersRepository,
    ...UsersProviders
  ],
  exports: [
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule { }