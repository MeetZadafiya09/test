import { Sequelize } from "sequelize";

import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from "../app.config.js";
const sequelize = new Sequelize(
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    {
        host: POSTGRES_HOST,
        dialect: 'postgres',
        port: POSTGRES_PORT,
        logging:false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

export { sequelize }