import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

export let token: any;
export const getToken = () => {
    const token: any = cookie.get("token");
    if (!token) {
        return;
    }
    const decode = jwtDecode(token);
    return decode;
};

export const setToken = () => {
    token = getToken();
};

export const clearToken = () => {
    token;
};
