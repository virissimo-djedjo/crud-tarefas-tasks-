import { Model } from 'sequelize';
import { AutoIncrement, Column, DataType, PrimaryKey, Table } from 'sequelize-typescript'

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
}