import { Router } from "express";
import {
    addUser,
    getUser,
    getUserById,
    login,
    logout,
    updatePhotoProfile,
} from "../controllers/userController.js";
import { uploadProfile, uploadFile } from "../libs/multerStorage/index.js";
import { addFile, deleteFile, getFile } from "../controllers/fileController.js";

const route = Router();

route.get("/users", getUser);
route.get("/users/:id", getUserById);
route.post("/users", addUser);
route.put("/users/:id", uploadProfile.single("profile"), updatePhotoProfile);
route.post("/login", login);
route.post("/logout", logout);

route.post("/file", uploadFile.single("file"), addFile);
route.get("/file", getFile);
route.delete("/file/:id", deleteFile);

export default route;
