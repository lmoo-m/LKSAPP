import { DataTypes } from "sequelize";
import database from "../config/database.js";
import post from "./post.js";
import like from "./like.js";

const user = database.define(
    "users",
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.STRING,
        profile: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

user.hasMany(post, { foreignKey: "user_id" });
user.hasMany(like, { foreignKey: "id_user" });

like.belongsTo(user, { foreignKey: "id_user" });
post.belongsTo(user, { foreignKey: "user_id" });

export default user;
