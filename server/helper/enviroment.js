import dotenv from "dotenv";

dotenv.config();

const env = {
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD || "",
    host: process.env.HOST,

    port: process.env.PORT,

    secretToken: process.env.SECRET_TOKEN,
};

export default env;
