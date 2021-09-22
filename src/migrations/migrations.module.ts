import { Module } from '@nestjs/common';
// # seeds
import { _20210806051724Users_Add_isActivedService } from './services/20210806051724Users_add_isActive';
import { _202108071702Active_UsersService } from './services/202108071702Active_Users';
import { _202108100924Expenses_add_new_columnsService } from './services/202108100924Expenses_add_new_columns';


import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  providers: [
    _20210806051724Users_Add_isActivedService,
    _202108071702Active_UsersService,
    _202108100924Expenses_add_new_columnsService
  ],
  exports: [
    _20210806051724Users_Add_isActivedService,
    _202108071702Active_UsersService,
    _202108100924Expenses_add_new_columnsService
  ],
})
export class MigrationsModule { }
