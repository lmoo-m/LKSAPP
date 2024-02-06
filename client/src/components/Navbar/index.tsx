"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

export default function Navbar() {
    const [isTop, setIsTop] = useState(true);
    const [isAuth, setIsAuth]: any = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scroll = window.scrollY;
            if (scroll > 0) {
                setIsTop(false);
            } else {
                setIsTop(true);
            }
        });
        const token: any = cookie.get("token");
        if (!token) {
            return;
        }
        const decode = jwtDecode(token);
        console.log(decode);
        setIsAuth(decode);
    }, []);

    return (
        <nav
            className={`flex justify-between fixed tracking-wide top-0 w-full py-5 px-3 items-center ${
                isTop ? "bg-light/0" : "shadow-md bg-secondary"
            } transition`}
        >
            <h1 className="text-xl  tracking-widest w-1/4 text-center">
                FileBox
            </h1>
            <section className="flex items-center gap-5 w-9/12 justify-center">
                <Link href={"/"} className="hover:text-light/50">
                    Beranda
                </Link>
                <Link href={"/"} className="hover:text-light/50">
                    Dashboard
                </Link>
                <Link href={"/"} className="hover:text-light/50">
                    File
                </Link>
            </section>
            {isAuth ? (
                <section className="flex gap-2 items-center w-1/4 justify-center relative">
                    <Image
                        onClick={() => alert("p")}
                        className="rounded-full cursor-pointer"
                        src={`${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${isAuth.profile}`}
                        alt={isAuth.username}
                        width={40}
                        height={40}
                    />
                    <div className="absolute -bottom-full translate-y-5 bg-primary border-light px-1 py-2 border rounded-md before:block before:bg-primary before:border before:border-light before:w-10 before:h-10 before:absolute before:top-0 before:rotate-45 before:left-1/2 before:-translate-x-1/2 z-50 before:-z-50">
                        <button
                            className={`border rounded-md px-2 py-1 ${
                                isTop
                                    ? "hover:border-primary hover:text-light/50"
                                    : "hover:text-secondary hover:bg-light "
                            }  transition font-bold`}
                        >
                            logout
                        </button>
                    </div>
                </section>
            ) : (
                <section className="flex gap-2 items-center w-1/4 justify-center">
                    <Link
                        href={"/register"}
                        className={`border rounded-md px-2 py-1 font-bold   ${
                            isTop
                                ? "hover:border-primary hover:text-light/50"
                                : "hover:text-secondary hover:bg-light "
                        }   transition`}
                    >
                        Daftar
                    </Link>
                    <Link
                        href={"/login"}
                        className={`border rounded-md px-2 py-1 ${
                            isTop
                                ? "hover:border-primary hover:text-light/50"
                                : "hover:text-secondary hover:bg-light "
                        }  transition font-bold`}
                    >
                        Masuk
                    </Link>
                </section>
            )}
        </nav>
    );
}
