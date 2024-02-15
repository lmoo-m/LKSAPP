import like from "../models/like.js";

export const addLike = async (req, res) => {
    const { id_user, id_post } = req.body;

    if (!id_user || !id_post) {
        return res.send({
            status: false,
            msg: "data tidak valid",
        });
    }

    const data = await like.create({ id_post, id_user });

    return res.send({
        status: true,
        msg: "berhasil memberi like",
        data,
    });
};

export const deleteLike = async (req, res) => {
    const { id } = req.params;

    const likeSelect = await like.findOne({ where: { id } });

    if (!likeSelect) {
        return res.send({
            status: false,
            msg: "data tidak ditemukan",
        });
    }

    await likeSelect.destroy();

    return res.send({
        status: true,
        msg: "berhasil menghapus like",
    });
};
