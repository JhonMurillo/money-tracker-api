import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from 'sequelize-typescript';
import { Expense } from '../../expenses/models/expenses.entity';

@Table({ timestamps: true })
export class ExpenseDetail extends Model {

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
    description: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    value: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isPaid: boolean;

    @ForeignKey(() => Expense)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    expenseId: string;

    @BelongsTo(() => Expense)
    expense: Expense;
}