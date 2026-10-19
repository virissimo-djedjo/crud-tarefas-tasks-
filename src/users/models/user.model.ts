import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, } from 'sequelize-typescript'
import { Task } from '../../tasks/models/task.model';

@Table({
    tableName: 'users',
    timestamps: false,
})

export class User extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @HasMany(() => Task)
    declare tasks: Task[]
}