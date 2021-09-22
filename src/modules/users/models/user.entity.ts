import { UUIDV4 } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    IsEmail,
    HasMany
} from 'sequelize-typescript';
import { Expense } from 'src/modules/expenses/models/expenses.entity';

@Table({ timestamps: true })
export class User extends Model {

    @PrimaryKey
    @Default(UUIDV4)
    @Column({
        type: DataType.STRING,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @IsEmail
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActived: boolean;

    @HasMany(() => Expense)
    expense: Expense[];
}
