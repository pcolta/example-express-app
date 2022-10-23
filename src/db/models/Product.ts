import {Table, Model, Column, DataType, PrimaryKey, AutoIncrement, CreatedAt} from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: true,
})

@Table
export class Product extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string
}
