"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormInputComponent } from "@/components/input";
import { register, uploadProfile } from "@/libs/axiosService/userService";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useRouter } from "next/navigation";

function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
    const navigate = useRouter();

    const handleButton = () => {
        register({ username, password, konfirmasiPassword }).then(
            (res: any): Promise<SweetAlertResult> => {
                if (!res.data.status) {
                    return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.data.msg,
                    });
                }

                const user = res.data?.data;

                return Swal.fire({
                    title: "Good job!",
                    text: "Berhasil membuat akun. mau pasang foto profile?",
                    icon: "success",
                    confirmButtonText: "YA",
                    showCancelButton: true,
                    cancelButtonText: "skip",
                }).then((result): any => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Select image",
                            icon: "question",
                            showCancelButton: true,
                            input: "file",
                            inputAttributes: {
                                accept: "image/*",
                                "aria-label": "Upload your profile picture",
                            },
                            showLoaderOnConfirm: true,
                            preConfirm: (response) => {
                                uploadProfile({
                                    id: user.id,
                                    photo: response,
                                }).then((e) => {
                                    if (!e.data.status) {
                                        return Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            html: `${e.data.msg} <br/> <p class='text-sm'>
                                            Silahkan kunjungi profil anda untuk mengganti foto profil
                                            </p>
                                            `,
                                        }).then(() => {
                                            navigate.push("/");
                                        });
                                    }
                                    Swal.fire({
                                        icon: "success",
                                        title: "Berhasil membuat foto profil",
                                    }).then(() => {
                                        navigate.push("/");
                                    });
                                });
                            },
                        }).then((e) => {
                            if (!e.isConfirmed) {
                                return navigate.push("/");
                            }
                        });
                    } else {
                        return navigate.push("/");
                    }
                    setUsername("");
                    setPassword("");
                    setKonfirmasiPassword("");
                });
            }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-secondary w-1/2 rounded-md p-4 text-white flex flex-col gap-3 shadow-md shadow-accent/75">
                <h1 className="text-2xl capitalize font-bold">
                    Buat Akun Baru
                </h1>
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

                <FormInputComponent
                    props={konfirmasiPassword}
                    setProps={setKonfirmasiPassword}
                    name="Konfirmasi Password"
                    type="password"
                />
                <button
                    onClick={() => handleButton()}
                    className="w-full outline-none mt-1 py-2 px-1 bg-secondary border border-white  rounded-sm placeholder:text-light/75 font-semibold  hover:border-primary hover:bg-primary hover:text-white transition"
                >
                    Register
                </button>
                <section>
                    <p>
                        Sudah punya Akun?{" "}
                        <Link href={"/login"} className="text-primary">
                            login disini
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Page;
