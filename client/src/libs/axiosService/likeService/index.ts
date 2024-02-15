import serviceAxios from "..";

export const like = async ({
    id_post,
    id_user,
}: {
    id_post: number;
    id_user: number;
}) => {
    const response = await serviceAxios.post("/like", { id_post, id_user });
    return response;
};

export const unLiked = async (id: number) => {
    const response = await serviceAxios.delete(`/like/${id}`);
    return response;
};
