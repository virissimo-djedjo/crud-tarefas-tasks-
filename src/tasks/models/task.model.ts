import { 
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Default,
    ForeignKey,
    BelongsTo
 } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

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

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare description: string | null;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare userId: number | null;

    @BelongsTo(() => User)
    declare user: User | null;
 }