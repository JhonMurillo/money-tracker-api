import { Injectable, Logger } from '@nestjs/common';
import * as bluebird from 'bluebird';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { DynamicMigrationsService } from '../../../modules/dynamic-migrations/services/dynamic-migrations.service';
// #seeds
import { _20210806051724Users_Add_isActivedService } from '../../../migrations/services/20210806051724Users_add_isActive';
import { _202108071702Active_UsersService } from '../../../migrations/services/202108071702Active_Users';
import { _202108100924Expenses_add_new_columnsService } from '../../../migrations/services/202108100924Expenses_add_new_columns';
@Injectable()
export class DynamicSeederService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private dynamicMigrationsService: DynamicMigrationsService,
        private _20210806051724Users_Add_isActivedService: _20210806051724Users_Add_isActivedService,
        private _202108071702Active_UsersService: _202108071702Active_UsersService,
        private _202108100924Expenses_add_new_columnsService: _202108100924Expenses_add_new_columnsService,
    ) {
        this.generateMigrationsSeeder();
    }
    private readonly logger = new Logger(DynamicSeederService.name);

    async generateMigrationsSeeder() {
        try {
            const args = { ...this };

            await bluebird.mapSeries(Object.keys(args), async (seedName: string) => {
                if (
                    seedName !== 'dynamicMigrationsService' &&
                    seedName !== 'logger' &&
                    seedName !== 'schedulerRegistry'
                ) {
                    const alreadyMigrated = await this.dynamicMigrationsService.findMigrationByName(
                        seedName,
                    );
                    
                    if (!alreadyMigrated?.isExecuted) {
                        await this[seedName].up();

                        await this.dynamicMigrationsService.upsertDynamicMigration({
                            id: alreadyMigrated?.id,
                            name: seedName,
                            isExecuted: true
                        });
                    }
                }
            });

            this.logger.debug('dynamic migration completed');

            const dynamicSeederJob = this.schedulerRegistry.getCronJob(
                'dynamic-seeder',
            );

            dynamicSeederJob.stop();
        } catch (err) {
            console.error(err)
            this.logger.error('error generating dynamic migrations', err);
        }
    }

    @Cron('0 0 */24 * * *', {
        name: 'dynamic-seeder',
    })
    async handleCron() {
        this.logger.debug('Called Management token Generated 24 Hours');
        await this.generateMigrationsSeeder();
    }
}
