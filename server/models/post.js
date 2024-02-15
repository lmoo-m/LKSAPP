import { DataTypes } from "sequelize";
import database from "../config/database.js";
import like from "./like.js";

const post = database.define(
    "post",
    {
        filename: DataTypes.STRING,
        title: DataTypes.STRING,
        date: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
        user_id: DataTypes.INTEGER,
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

post.hasMany(like, { foreignKey: "id_post" });
like.belongsTo(post, { foreignKey: "id_post" });

export default post;
