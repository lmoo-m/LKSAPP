import { DataTypes } from "sequelize";
import database from "../config/database.js";

const like = database.define(
    "like",
    {
        id_post: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default like;
