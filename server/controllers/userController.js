import jwt from "jsonwebtoken";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import env from "../helper/enviroment.js";
import post from "../models/post.js";
import like from "../models/like.js";
import fs from "fs";

export const getUser = async (req, res) => {
    const users = await user.findAll({
        include: [
            { model: post, include: [like] },
            { model: like, include: [post] },
        ],
    });

    if (users.length === 0) {
        return res.send({
            status: false,
            msg: "data users cannot ready",
        });
    }

    return res.send({
        status: true,
        msg: "get data users",
        data: users,
    });
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    const userSelect = await user.findOne({
        where: { id },
        include: [
            { model: post, include: [{ model: like }] },
            {
                model: like,
                include: [
                    {
                        model: post,
                        include: [like, user],
                    },
                ],
            },
        ],
    });

    if (!userSelect) {
        return res.send({
            status: false,
            msg: "user tidak ditemukan",
        });
    }

    return res.send({
        status: true,
        msg: "get data users",
        data: userSelect,
    });
};

export const updatePhotoProfile = async (req, res) => {
    const profile = req.file;
    const { id } = req.params;

    if (!profile) {
        return res.send({
            status: false,
            msg: "Wajib mengisi foto",
        });
    }

    const userSelect = await user.findOne({ where: { id } });
    if (!userSelect) {
        return res.send({
            status: false,
            msg: "User tidak ditemukan",
        });
    }

    const updateProfile = await userSelect.update({
        profile: profile.filename,
    });

    return res.send({
        status: true,
        msg: "Berhasil mengupdate poto profil",
        data: updateProfile,
    });
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === "" || password === "") {
            return res.send({
                status: false,
                msg: "Mohon mengisi semua form yang tersedia",
            });
        }

        const findUser = await user.findOne({ where: { username } });
        if (!findUser) {
            return res.send({
                status: false,
                msg: "User tidak ditemukan",
            });
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (!passwordMatch) {
            return res.send({
                status: false,
                msg: "Password Salah!",
            });
        }

        const payload = {
            id: findUser.id,
            username: findUser.username,
            profile: findUser.profile,
            bio: findUser.bio,
        };

        const token = jwt.sign(payload, env.secretToken, { expiresIn: "1d" });

        res.cookie("token", token);
        return res.send({
            status: true,
            msg: "berhasil login",
            data: { payload, token },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            msg: "server error",
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.send({
        status: true,
        msg: "berhasil logout",
    });
};

export const addUser = async (req, res) => {
    const { username, password, konfirmasiPassword } = req.body;

    if (username === "" || password === "" || konfirmasiPassword === "") {
        return res.send({
            status: false,
            msg: "Mohon mengisi semua form yang tersedia",
        });
    }

    const checkUsername = await user.findOne({ where: { username } });
    if (checkUsername) {
        return res.send({
            status: false,
            msg: "username sudah pernah digunakan akun lain",
        });
    }

    if (password !== konfirmasiPassword) {
        return res.send({
            status: false,
            msg: "konfirmasi password salah",
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
        username,
        password: hashPassword,
    });

    return res.send({
        status: true,
        msg: "create new user",
        data: newUser,
    });
};

export const editUser = async (req, res) => {
    const { bio, id, username, password, konfirmasiPassword } = req.body;
    const file = req.file;

    if ((!bio, !id, !username)) {
        return res.send({
            status: false,
            msg: "data tidak valid",
        });
    }

    const userSelect = await user.findOne({ where: { id } });
    if (!userSelect) {
        return res.send({
            status: false,
            msg: "user tidak ditemukan",
        });
    }

    if (file) {
        fs.unlink(`./uploads/profile/${userSelect.profile}`, async (err) => {
            if (err) {
                console.log(err);
            }
        });
        const data = await userSelect.update({
            bio,
            username,
            profile: file.filename,
        });

        const payload = {
            id: data.id,
            username: data.username,
            profile: data.profile,
            bio: data.bio,
        };

        const token = jwt.sign(payload, env.secretToken, { expiresIn: "1d" });

        res.cookie("token", token);

        return res.send({
            status: true,
            msg: "berhasil mengupdate profile",
            data,
        });
    }

    const data = await userSelect.update({ bio, username });

    const payload = {
        id: data.id,
        username: data.username,
        profile: data.profile,
        bio: data.bio,
    };

    const token = jwt.sign(payload, env.secretToken, { expiresIn: "1d" });

    res.cookie("token", token);

    return res.send({
        status: true,
        msg: "berhasil mengupdate profile",
        data,
    });
};
