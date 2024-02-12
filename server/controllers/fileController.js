import file from "../models/file.js";
import fs from "fs";
import user from "../models/user.js";

export const addFile = async (req, res) => {
    const fileUser = req.file;
    const { title, user_id } = req.body;
    const date = new Date(Date.now()).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    if (!fileUser) {
        return res.send({
            status: false,
            msg: "file wajib di isi",
        });
    }

    const checkUser = await user.findOne({ where: { id: user_id } });

    if (!checkUser) {
        return res.send({
            status: false,
            msg: "id user tidak valid",
        });
    }

    const response = await file.create({
        filename: fileUser.filename,
        title,
        user_id,
        date,
    });

    return res.send({
        status: true,
        msg: "file berhasil di upload",
        data: response,
    });
};

export const getFile = async (req, res) => {
    const data = await file.findAll({
        include: [{ model: user, attributes: ["id", "username", "profile"] }],
    });
    return res.send({
        status: true,
        msg: "berhasil ambil data",
        data,
    });
};

export const deleteFile = async (req, res) => {
    const { id } = req.params;

    const selectFile = await file.findOne({ where: { id } });

    fs.unlink(`./uploads/file/${selectFile.filename}`, async (err) => {
        if (err) {
            console.log(err);
        }
        await selectFile.destroy();
        console.log("delete");
    });

    return res.send({
        selectFile,
    });
};
