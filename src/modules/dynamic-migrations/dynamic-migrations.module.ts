import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DynamicMigrations } from './models/dynamic-migrations.entity';
import { DynamicMigrationsRepository } from './repositories/dynamic-migrations.repository';
import { DynamicMigrationsProviders } from './repositories/dynamic-migrations.provider';
import { DynamicMigrationsService } from './services/dynamic-migrations.service';
@Module({
    imports: [SequelizeModule.forFeature([DynamicMigrations])],
    controllers: [],
    providers: [
        DynamicMigrationsService,
        DynamicMigrationsRepository,
        ...DynamicMigrationsProviders
    ],
    exports: [DynamicMigrationsService],
})
export class DynamicMigrationsModule { }
