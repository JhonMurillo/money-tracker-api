import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabasePostgresConfigModule } from './core/database/database.config.module';
import { AppConfigModule } from './core/app/app.config.module';
import { DynamicMigrationsModule } from './modules/dynamic-migrations/dynamic-migrations.module';
import { MigrationsModule } from './migrations/migrations.module';
import { TasksModule } from './tasks/tasks.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ExpensesDetailModule } from './modules/expenses-detail/expenses-detail.module';

@Module({
  imports: [
    AppConfigModule,
    DatabasePostgresConfigModule,
    UsersModule,
    AuthModule,
    MigrationsModule,
    DynamicMigrationsModule,
    TasksModule,
    ExpensesModule,
    ExpensesDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
