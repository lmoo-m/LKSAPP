import serviceAxios from "../index";

export const getFile = async () => {
    const data = await serviceAxios.get("/file");
    return data;
};
