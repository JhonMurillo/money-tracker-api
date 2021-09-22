import { Injectable } from '@nestjs/common';
import { Sequelize, DataType } from 'sequelize-typescript';

@Injectable()
export class _20210806051724Users_Add_isActivedService {
    constructor(private sequelize: Sequelize) { }
    async up(): Promise<void> {
        const tableName = 'Users'
        const queryInterface = this.sequelize.getQueryInterface();
        Promise.all([
            queryInterface.addColumn(
                tableName,
                'isActived',
                {
                    type: DataType.BOOLEAN,
                    allowNull: true,
                },
            )
        ]);
    }
}