import { Injectable } from '@nestjs/common';
import { Sequelize, DataType } from 'sequelize-typescript';

@Injectable()
export class _202108100924Expenses_add_new_columnsService {
    constructor(private sequelize: Sequelize) { }
    async up(): Promise<void> {
        const tableName = 'Expenses'
        const queryInterface = this.sequelize.getQueryInterface();
        Promise.all([
            queryInterface.addColumn(
                tableName,
                'totalDetailPaid',
                {
                    type: DataType.INTEGER,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                tableName,
                'totalDetailUnPaid',
                {
                    type: DataType.INTEGER,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                tableName,
                'totalDetails',
                {
                    type: DataType.INTEGER,
                    allowNull: true,
                },
            ),
            queryInterface.addColumn(
                tableName,
                'fullDate',
                {
                    type: DataType.DATE,
                    allowNull: true,
                },
            )
        ]);
    }
}