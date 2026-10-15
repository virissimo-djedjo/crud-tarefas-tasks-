import { 
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Default,
 } from "sequelize-typescript";

 @Table({
    tableName: 'tasks',
    timestamps: false,
 })

 export class Task extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })

    declare completed: boolean;

 }