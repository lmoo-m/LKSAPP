"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInputComponent } from "@/components/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { login } from "@/libs/axiosService/userService";
import { setToken } from "@/libs/decodeToken";
import { AuthContextGlobal } from "@/libs/context/authContext";

function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useRouter();
    const { setIsLogin }: any = AuthContextGlobal();

    const handleButton: () => void = () => {
        login({ username, password }).then((response): any => {
            if (!response.data.status) {
                return Swal.fire({
                    icon: "error",
                    text: response.data.msg,
                });
            }
            Swal.fire({
                icon: "success",
                text: response.data.msg,
            }).then((e) => {
                if (e.isConfirmed) {
                    // navigate.push("/");
                    location.href = "/";
                }
            });

            setToken();
            setIsLogin(true);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-secondary w-1/2 rounded-md p-4 text-white flex flex-col gap-3 shadow-md shadow-accent/75">
                <h1 className="text-2xl capitalize font-bold">Masuk akun</h1>
                <FormInputComponent
                    props={username}
                    setProps={setUsername}
                    name="Username"
                />

                <FormInputComponent
                    props={password}
                    setProps={setPassword}
                    name="Password"
                    type="password"
                />
                <button
                    onClick={() => handleButton()}
                    className="w-full outline-none mt-1 py-2 px-1 bg-secondary  text-light rounded-sm font-semibold border border-white hover:border-primary hover:bg-primary hover:text-white transition"
                >
                    Login
                </button>
                <section>
                    <p>
                        Belum punya Akun?{" "}
                        <Link href={"/register"} className="text-primary">
                            daftar disini
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Page;
