const DB_ENGINE = "mysql";
// const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

import {Sequelize} from "sequelize-typescript";

const connection = new Sequelize("example-express-app", "user", "password", {
    host: 'database',
    port: 3306,
    dialect: DB_ENGINE,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    models: [__dirname + "/models"],
});

export default connection;
