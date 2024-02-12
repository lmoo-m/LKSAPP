"use client";

import { getToken } from "@/libs/decodeToken";
import React, { createContext, useContext, useReducer, useState } from "react";

export const Auth: any = createContext({
    isLogin: false,
    setIsLogin: (): boolean => false,
});

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <Auth.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </Auth.Provider>
    );
}

export const AuthContextGlobal = () => useContext(Auth);
