import { DataTypes } from "sequelize";
import database from "../config/database.js";
import file from "./file.js";

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

user.hasMany(file, { foreignKey: "user_id" });
file.belongsTo(user, { foreignKey: "user_id" });

export default user;
