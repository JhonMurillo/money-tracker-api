import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DynamicSeederModule } from './dynamicMigrations/dynamicMigrations.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        DynamicSeederModule,
    ],
})
export class TasksModule { }