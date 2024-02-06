import { Router } from "express";
import {
    addUser,
    getUser,
    login,
    logout,
    updatePhotoProfile,
} from "../controllers/userController.js";
import multer from "multer";

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/profile");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadProfile = multer({ storage: storageProfile });

const route = Router();

route.get("/users", getUser);
route.post("/users", addUser);
route.put("/users/:id", uploadProfile.single("profile"), updatePhotoProfile);
route.post("/login", login);
route.post("/logout", logout);

export default route;
