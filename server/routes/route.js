import { Router } from "express";
import {
    addUser,
    editUser,
    getUser,
    getUserById,
    login,
    logout,
    updatePhotoProfile,
} from "../controllers/userController.js";
import { uploadProfile, uploadFile } from "../libs/multerStorage/index.js";
import { addLike, deleteLike } from "../controllers/likeController.js";
import {
    UpdateArchive,
    addPost,
    deletePost,
    getPost,
} from "../controllers/postController.js";

const route = Router();

route.get("/users", getUser);
route.get("/users/:id", getUserById);
route.post("/users", addUser);
route.put("/users/:id", uploadProfile.single("profile"), updatePhotoProfile);
route.patch("/users", uploadProfile.single("profile"), editUser);
route.post("/login", login);
route.post("/logout", logout);

route.post("/posts", uploadFile.single("file"), addPost);
route.get("/posts", getPost);
route.patch("/posts", UpdateArchive);
route.delete("/posts/:id", deletePost);

route.post("/like", addLike);
route.delete("/like/:id", deleteLike);

export default route;
