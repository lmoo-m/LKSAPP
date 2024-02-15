import multer from "multer";

const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/profile");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${Math.floor(Math.random * 999)}-${
                file.originalname
            }`
        );
    },
});

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/file");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${Math.floor(Math.random * 999)}-${
                file.originalname
            }`
        );
    },
});

export const uploadProfile = multer({ storage: storageProfile });
export const uploadFile = multer({ storage: storageFile });
