"use client";

import Main from "@/components/main";
import Sidebar from "@/components/Sidebar";
import { AuthContextGlobal } from "@/libs/context/authContext";
import { getToken } from "@/libs/decodeToken";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ContainerMain({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    const { setIsLogin }: any = AuthContextGlobal();

    useEffect(() => {
        const token = getToken();
        setIsLogin(token ? true : false);
    });

    return (
        <>
            {path === "/login" || path === "/register" ? (
                children
            ) : (
                <section className="grid grid-cols-6">
                    <Sidebar />
                    <Main>{children}</Main>
                </section>
            )}
        </>
    );
}
