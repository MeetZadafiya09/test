import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/postgress.config.js";
import Users from "./user.model.js";

const db: any = {};

db.users = Users(sequelize, DataTypes);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

let isDbConnected = false;

export const connectDB = async () => {
    if (isDbConnected) {
        return;
    }

    try {
        await db.sequelize.authenticate();
        console.log("Database connection established successfully.");

        await db.sequelize.sync();
        console.log("Models synchronized successfully.");

        isDbConnected = true;
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default db;