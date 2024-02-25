import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import env from "./helper/enviroment.js";
import route from "./routes/route.js";
import cors from "cors";
import user from "./models/user.js";
import cookieParser from "cookie-parser";
import post from "./models/post.js";
import like from "./models/like.js";

dotenv.config();
const app = express();

try {
    await database.authenticate();
    await user.sync();
    await post.sync();
    await like.sync();

    console.log("database connected");
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);

app.use("/uploads", express.static("uploads"));
app.use(route);

app.listen(env.port, console.log(`running in port ${env.port}`));
