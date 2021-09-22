import { Module } from '@nestjs/common';
import { DynamicSeederService } from './services/dynamicMigrations.service';
import { DynamicMigrationsModule } from '../../modules/dynamic-migrations/dynamic-migrations.module';
import { MigrationsModule } from '../../migrations/migrations.module';

@Module({
    imports: [DynamicMigrationsModule, MigrationsModule],
    providers: [DynamicSeederService],
})
export class DynamicSeederModule { }