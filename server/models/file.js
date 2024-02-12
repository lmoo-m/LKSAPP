import { DataTypes } from "sequelize";
import database from "../config/database.js";

const file = database.define(
    "file",
    {
        filename: DataTypes.STRING,
        title: DataTypes.STRING,
        date: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default file;
