import { Sequelize } from "sequelize";
import env from "../helper/enviroment.js";

const database = new Sequelize(env.database, env.user, env.password, {
    host: env.host,
    dialect: "mysql",
});

export default database;
