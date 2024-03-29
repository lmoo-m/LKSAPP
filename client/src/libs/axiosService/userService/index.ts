import serviceAxios from "..";
import { loginType, registerType, uploadPhotoType } from "./type";

export const getUsers = async () => {
    const data = await serviceAxios.get("/users");
    return data;
};

export const register = async ({
    username,
    password,
    konfirmasiPassword,
}: registerType) => {
    const response = await serviceAxios.post("/users", {
        username,
        password,
        konfirmasiPassword,
    });
    return response;
};

export const getUser = async (id: number) => {
    const response = await serviceAxios.get(`/users/${id}`);
    return response;
};

export const uploadProfile = async ({ id, photo }: uploadPhotoType) => {
    const form = new FormData();
    form.append("profile", photo);

    const response = await serviceAxios.put(`/users/${id}`, form);
    return response;
};

export const login = async ({ username, password }: loginType) => {
    const response = await serviceAxios.post("/login", {
        username,
        password,
    });
    return response;
};

export const logout = async () => {
    const response = await serviceAxios.post("/logout");
    return response;
};

export const editProfile = async (data: any) => {
    const response = await serviceAxios.patch("/users", data);
    return response;
};
