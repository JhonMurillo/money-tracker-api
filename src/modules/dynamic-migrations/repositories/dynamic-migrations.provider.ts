import { DynamicMigrations } from '../models/dynamic-migrations.entity';
import { DYNAMIC_MIGRATION_REPOSITORY } from '../../../core/constants';

export const DynamicMigrationsProviders = [{
    provide: DYNAMIC_MIGRATION_REPOSITORY,
    useValue: DynamicMigrations,
}];