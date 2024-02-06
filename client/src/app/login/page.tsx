"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInputComponent } from "@/components/input";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useRouter } from "next/navigation";
import { login } from "@/libs/axiosService/userService";

function page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useRouter();

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
            });
            return navigate.push("/");
        });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-light w-1/2 rounded-md p-4 text-primary flex flex-col gap-3 shadow-md shadow-accent/75">
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
                    className="w-full outline-none mt-1 py-2 px-1 bg-secondary text-light rounded-sm placeholder:text-light/75 font-semibold border border-secondary/0 hover:border-secondary hover:bg-secondary/0 hover:text-secondary transition"
                >
                    Login
                </button>
                <section>
                    <p>
                        Belum punya Akun?{" "}
                        <Link href={"/register"} className="text-secondary">
                            daftar disini
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default page;
