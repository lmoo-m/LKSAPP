import React, { Dispatch, useEffect, useState } from "react";
import { FormInputComponent } from "@/components/input";
import { ProfileContextGlobal } from "@/libs/context/profileContext";
import { editProfile } from "@/libs/axiosService/userService";
import Swal from "sweetalert2";

interface propsType {
    show: boolean;
    setShow: Dispatch<boolean>;
    ref: any;
}

export default function ModalEditProfile({ show, setShow, ref }: propsType) {
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState<string>("");

    const { user, setUser }: any = ProfileContextGlobal();

    useEffect(() => {
        setUsername(user.username);
        setPreview(
            user.profile
                ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${user.profile}`
                : ""
        );
        setBio(user.bio ? user.bio : "");
    }, [user, show]);

    const handleFile = (e: any) => {
        const files = e.target.files[0];
        if (!files) {
            return;
        }
        const url = URL.createObjectURL(files);
        setPreview(url);
        setFile(files);
    };

    const handleButton = () => {
        const form: any = new FormData();

        form.append("username", username);
        form.append("bio", bio);
        form.append("id", user.id);
        if (file) {
            form.append("profile", file);
        }

        editProfile(form).then((res: any) => {
            if (!res.data.status) {
                return Swal.fire({
                    icon: "error",
                    text: res.data.msg,
                });
            }
            const { data } = res.data;
            setUser((prev: any) => {
                return {
                    ...prev,
                    ...data,
                };
            });
            console.log(user);
            Swal.fire({
                icon: "success",
                text: res.data.msg,
            });
        });
        setShow(!show);
    };

    return (
        <div
            className="fixed h-full z-50 left-0 top-0 bg-dark/70 flex items-center w-full justify-center"
            ref={ref}
        >
            <div className="bg-secondary w-1/4 rounded-md p-4 text-white flex flex-col gap-3 shadow-md shadow-accent/75">
                <h1 className="text-2xl capitalize font-bold">Edit Akun</h1>
                <FormInputComponent
                    name="Username"
                    props={username}
                    setProps={setUsername}
                />

                <FormInputComponent name="Bio" props={bio} setProps={setBio} />
                <div className="flex justify-between">
                    <label
                        htmlFor="file"
                        className="outline-none mt-1 py-2 px-1 bg-secondary self-start text-light rounded-sm font-semibold border border-white hover:border-primary hover:bg-primary hover:text-white transition cursor-pointer"
                    >
                        Foto Profile
                    </label>
                    <input
                        type="file"
                        hidden
                        id="file"
                        accept="image/*"
                        onChange={handleFile}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            loading="lazy"
                            className="rounded-full aspect-square w-1/2"
                        />
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => setShow(!show)}
                        className="outline-none mt-1 py-2 px-4 bg-secondary  text-light rounded-sm font-semibold border border-white hover:border-primary hover:bg-primary hover:text-white transition"
                    >
                        Kembali
                    </button>
                    <button
                        onClick={() => handleButton()}
                        className=" outline-none mt-1 py-2 px-4 bg-secondary  text-light rounded-sm font-semibold border border-white hover:border-primary hover:bg-primary hover:text-white transition"
                    >
                        Oke
                    </button>
                </div>
            </div>
        </div>
    );
}
