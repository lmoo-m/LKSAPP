import React, { useRef, useState } from "react";
import PhotoProfile from "@/components/photoProfile";
import { FaFile } from "react-icons/fa6";
import { getToken } from "@/libs/decodeToken";
import { postFile } from "@/libs/axiosService/postService";
import Swal from "sweetalert2";

export default function FormInput({
    user,
    setUpdate,
}: {
    user: any;
    setUpdate: React.Dispatch<any>;
}) {
    const [height, setHeight] = useState<string>("2rem");
    const [text, setText] = useState<string>("");
    const [preview, setPreview] = useState<string>("");
    const [file, setFile] = useState<File | null>();

    const textRef = useRef(null);
    const element: any = textRef?.current;

    const handleChange = (e: any) => {
        setText(e.target.value);
        setHeight(element?.scrollHeight);
    };

    const handleFile = (e: any) => {
        const fileInput = e.target?.files[0];
        setFile(fileInput);
        setPreview(URL.createObjectURL(fileInput));
    };

    const handleButton = () => {
        const { id }: any = getToken();
        const form: any = new FormData();
        if (file) {
            form.append("file", file);
        }
        form.append("title", text);
        form.append("user_id", id);

        postFile(form).then((res): any => {
            if (!res.data.status) {
                return Swal.fire({
                    icon: "error",
                    text: res.data.msg,
                });
            }
            setFile(null);
            setPreview("");
            setText("");
            return Swal.fire({
                icon: "success",
                text: res.data.msg,
            }).then((response) => {
                if (response.isConfirmed) {
                    setUpdate(Math.floor(Math.random() * 10));
                }
            });
        });
    };

    return (
        <section className="px-5 bg-dark border-b-2 border-b-accent py-3 flex gap-3">
            <section>
                <PhotoProfile width={40} heigth={40} user={user} />
            </section>

            <section className="w-full">
                <textarea
                    ref={textRef}
                    onChange={handleChange}
                    value={text}
                    placeholder="apa yang kamu pikirkan?"
                    className="bg-dark outline-none w-full overflow-visible resize-none"
                    style={{
                        height: text ? height : "2rem",
                    }}
                />
                <section>
                    {preview && <img src={preview} alt="Preview" />}
                </section>
                <section className="mt-2 flex justify-between">
                    <div>
                        <label
                            htmlFor="fileForm"
                            className="hover:bg-white/10 transition cursor-pointer p-2 inline-block rounded-full"
                        >
                            <FaFile className="text-primary text-xl" />
                        </label>
                        <input
                            type="file"
                            id="fileForm"
                            onChange={handleFile}
                            className="hidden "
                        />
                    </div>
                    <button
                        onClick={() => handleButton()}
                        className="bg-primary rounded-xl px-5 py-1 transition hover:bg-white hover:text-primary font-semibold"
                    >
                        Post
                    </button>
                </section>
            </section>
        </section>
    );
}
