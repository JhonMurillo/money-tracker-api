import { Inject, Injectable } from '@nestjs/common';
import { DYNAMIC_MIGRATION_REPOSITORY } from '../../../core/constants';
import { CreateDynamicMigrationsDTO, DynamicMigrationsDTO } from '../dtos/dynamic-migrations.dto';
import { DynamicMigrations } from '../models/dynamic-migrations.entity';

@Injectable()
export class DynamicMigrationsRepository {
    constructor(
        @Inject(DYNAMIC_MIGRATION_REPOSITORY)
        private readonly dynamicMigrationModel: typeof DynamicMigrations,
    ) { }

    create(dto: CreateDynamicMigrationsDTO, transaction: any = null): Promise<DynamicMigrationsDTO> {
        return this.dynamicMigrationModel.create({ ...dto, isExecuted: true }, { transaction });
    }

    upsert(dto: DynamicMigrationsDTO, transaction: any = null): Promise<[DynamicMigrationsDTO, boolean]> {
        return this.dynamicMigrationModel.upsert(dto);
    }


    findByName(
        name
    ): Promise<DynamicMigrationsDTO> {
        return this.dynamicMigrationModel.findOne({
            where: { name }
        });
    }

}