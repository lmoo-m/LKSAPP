"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "@/libs/axiosService/userService";
import Swal from "sweetalert2";
import { clearToken, getToken } from "@/libs/decodeToken";
import { AuthContextGlobal } from "@/libs/context/authContext";
import ListLink from "../ListLink";

export default function Sidebar() {
    const { isLogin, setIsLogin }: any = AuthContextGlobal();

    const handleLogout = () => {
        logout().then((res: any) => {
            clearToken();
            setIsLogin(false);
            Swal.fire({
                icon: "success",
                title: res.data.msg,
            }).then((e) => {
                if (e.isConfirmed) {
                    location.href = "/";
                }
            });
        });
    };

    return (
        <aside
            className={`grid grid-rows-5 sidebar h-screen bg-dark tracking-wide col-span-1 py-5 px-3 items-center transition`}
        >
            <section className="row-span-3 h-full flex flex-col items-center gap-7 ">
                <h1 className="text-xl tracking-widest text-center">FileBox</h1>
                <ListLink />
            </section>
            <section className="row-start-5 h-full flex justify-center items-center">
                {isLogin ? (
                    <button
                        onClick={() => handleLogout()}
                        className={`border rounded-md px-2 py-1 font-bold transition-all w-full hover:bg-primary hover:border-primary`}
                    >
                        Logout
                    </button>
                ) : (
                    <section className="flex gap-2 items-center w-full justify-center">
                        <Link
                            href={"/register"}
                            className={`border rounded-md px-2 py-1 font-bold transition-all hover:bg-primary hover:border-primary`}
                        >
                            Daftar
                        </Link>
                        <Link
                            href={"/login"}
                            className={`border rounded-md px-2 py-1 transition-all font-bold hover:bg-primary hover:border-primary`}
                        >
                            Masuk
                        </Link>
                    </section>
                )}
            </section>
        </aside>
    );
}
