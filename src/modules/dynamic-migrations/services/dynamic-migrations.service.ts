import { Injectable } from '@nestjs/common';
import { DynamicMigrationsRepository } from '../repositories/dynamic-migrations.repository';
import { CreateDynamicMigrationsDTO, DynamicMigrationsDTO } from '../dtos/dynamic-migrations.dto';
@Injectable()
export class DynamicMigrationsService {
    constructor(private readonly dynamicMigrationsRepository: DynamicMigrationsRepository) { }

    async findMigrationByName(name: string): Promise<DynamicMigrationsDTO> {
        try {
            const result = await this.dynamicMigrationsRepository.findByName(name);
            return result ? result['dataValues'] : result;
        } catch (error) {
            throw new Error('Error searching the migration')
        }
    }

    async createDynamicMigration(
        dynamicMigration: CreateDynamicMigrationsDTO,
    ): Promise<DynamicMigrationsDTO> {
        try {
            const result = await this.dynamicMigrationsRepository.create(dynamicMigration);
            return result;
        } catch (error) {
            console.error(error)
            throw new Error('Error saving the migration')
        }
    }

    async upsertDynamicMigration(
        dynamicMigration: DynamicMigrationsDTO,
    ): Promise<[DynamicMigrationsDTO, boolean]> {
        try {
            const result = await this.dynamicMigrationsRepository.upsert(dynamicMigration);
            return result;
        } catch (error) {
            console.error(error)
            throw new Error('Error saving the migration')
        }
    }
}
