import { UUIDV4 } from 'sequelize';
import {
    Table,
    Model,
    PrimaryKey,
    AllowNull,
    Unique,
    Column,
    DataType,
    Default,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class DynamicMigrations extends Model {

    @PrimaryKey
    @Default(UUIDV4)
    @Column({
        type: DataType.STRING,
    })
    id: string;

    @PrimaryKey
    @AllowNull(false)
    @Unique({ name: 'name', msg: 'migration name already exists.' })
    @Column
    name: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isExecuted: boolean;
}
