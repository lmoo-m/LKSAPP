import post from "../models/post.js";
import fs from "fs";
import user from "../models/user.js";
import like from "../models/like.js";

export const addPost = async (req, res) => {
    const fileUser = req.file;
    const { title, user_id } = req.body;
    const date = new Date(Date.now()).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // if (!fileUser) {
    //     return res.send({
    //         status: false,
    //         msg: "file wajib di isi",
    //     });
    // }

    const checkUser = await user.findOne({ where: { id: user_id } });

    if (!checkUser) {
        return res.send({
            status: false,
            msg: "id user tidak valid",
        });
    }

    const response = await post.create({
        filename: fileUser ? fileUser.filename : null,
        public: true,
        title,
        user_id,
        date,
    });

    return res.send({
        status: true,
        msg: "Postinganmu telah dibuat",
        data: response,
    });
};

export const UpdateArchive = async (req, res) => {
    const { id, archive } = req.body;
    console.log(archive);

    if (!id || archive === undefined) {
        return res.send({
            status: false,
            msg: "data tidak valid",
        });
    }

    const data = await post.update(
        {
            public: archive,
        },
        {
            where: { id },
        }
    );

    return res.send({
        status: true,
        msg: "succes",
        data,
    });
};

export const getPost = async (req, res) => {
    const data = await post.findAll({
        include: [
            { model: user, attributes: ["id", "username", "profile"] },
            { model: like },
        ],
        where: {
            public: true,
        },
    });
    return res.send({
        status: true,
        msg: "berhasil ambil data",
        data,
    });
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    const selectFile = await post.findOne({ where: { id } });

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
