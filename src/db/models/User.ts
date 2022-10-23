import {Table, Column, Model, DataType} from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        type: DataType.STRING,
        validate: {
            len: [5, 10],
        }
    })
    userName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        validate: {
            isEmail: {
                msg: "Must be an email type"
            }
        }
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    passwordHash: string; // Password is hashed with a salt, so it's not stored in plain text, format: `passwordHash.salt`

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    firstName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    lastName: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM('Admin', 'User')
    })
    role: string;
}
