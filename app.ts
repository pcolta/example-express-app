import express, {Application, Request, Response, NextFunction} from 'express';
import {json, urlencoded} from "body-parser";
import connection from "./src/db";
import productsRoutes from "./src/routes/product";
import userRoutes from "./src/routes/user";
import cors from "cors";
import sequelizeFixtures from "sequelize-fixtures";


const PORT = 8080;
const HOST = '0.0.0.0';

const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

app.use(json())
app.use(urlencoded({extended: true}));

app.use(productsRoutes);
app.use(userRoutes);

app.use(
    (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(500).json({message: err.message});
    }
);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, HOST, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
        await connection.authenticate();
        await connection.sync({force: true})
            .then(() => {
                console.log("Database successfully connected");
                sequelizeFixtures.loadFiles(["./src/db/data/fixtures/products.json"], [__dirname + "/models"]).then(() => {
                    process.exit()
                })
            })
            .catch((err) => {
                console.log("Error", err);
            });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();
