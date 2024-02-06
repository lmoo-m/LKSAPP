import { DataTypes } from "sequelize";
import database from "../config/database.js";

const user = database.define(
    "users",
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        profile: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

export default user;
