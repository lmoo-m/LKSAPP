import serviceAxios from "../index";

export const getFile = async () => {
    const data = await serviceAxios.get("/posts");
    return data;
};

export const postFile = async (data: any) => {
    const response = await serviceAxios.post("/posts", data);
    return response;
};

export const updateArchive = async (
    id: number,
    archive: boolean | undefined
) => {
    const response = await serviceAxios.patch("/posts", { id, archive });
    return response;
};

export const deletePost = async (id: number) => {
    const response = await serviceAxios.delete(`/posts/${id}`);
    return response;
};
