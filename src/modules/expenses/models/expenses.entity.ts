import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { ExpenseDetail } from 'src/modules/expenses-detail/models/expenses-detail.entity';
import { User } from '../../users/models/user.entity';

@Table({ timestamps: true })
export class Expense extends Model {

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
    date: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fullDate: Date;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    total: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalDetailPaid: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalDetailUnPaid: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalDetails: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isClosed: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => ExpenseDetail)
    expenseDetail: ExpenseDetail[];
}