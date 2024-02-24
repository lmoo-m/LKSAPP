import React, { useEffect, useRef, useState } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa6";
import PhotoProfile from "../photoProfile";
import { getToken } from "@/libs/decodeToken";
import { like, unLiked } from "@/libs/axiosService/likeService";
import { SlOptions } from "react-icons/sl";
import { deletePost, updateArchive } from "@/libs/axiosService/postService";
import { dataProps } from "./type";
import Image from "next/image";

export default function CardPost(data: dataProps) {
    const { setUpdate }: any = data;
    const [show, setShow] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const closeRef: any = useRef();

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (!closeRef?.current?.contains(e?.target)) setShow(false);
        });
    }, []);

    const handleLike = () => {
        setActive(true);
        const user: any = getToken();
        like({ id_post: data.id, id_user: user?.id }).then((res) => {
            setActive(false);
            return setUpdate(Math.floor(Math.random() * 10));
        });
    };

    const handleArchive = () => {
        const archive = data.public;

        updateArchive(data.id, !archive).then((res) => {
            console.log(res);
            return setUpdate(Math.floor(Math.random() * 999));
        });
    };

    const handleDelete = (id: number) => {
        deletePost(id).then(() => {
            return setUpdate(Math.floor(Math.random() * 999));
        });
    };

    const unLike = (like: any) => {
        unLiked(like?.id).then((res) => {
            return setUpdate(Math.floor(Math.random() * 10));
        });
    };

    const findUser = data?.likes?.find((e: any) => {
        const user: any = getToken();
        return e.id_user === user?.id;
    });

    return (
        <>
            <article className="border-t-2 border-accent bg-dark flex py-2 px-4 gap-2 w-full min-h-fit">
                <section className="w-[8%]">
                    <PhotoProfile user={data.user} />
                </section>

                <section className="min-w-[92%] max-w-full">
                    <section className="flex justify-between">
                        <h1 className="text-lg font-semibold">
                            {data.user.username}
                        </h1>
                        <div className="flex gap-2">
                            <p className=" text-sm text-end text-white/40 ">
                                {data.date}
                            </p>
                            {data.controll && (
                                <div className="relative">
                                    <button
                                        ref={closeRef}
                                        className="hover:bg-white/10 transition-all rounded-full p-1"
                                        onClick={() => setShow(!show)}
                                    >
                                        <SlOptions />
                                    </button>
                                    {show && (
                                        <div className="bg-white rounded-md absolute right-0 text-primary font-bold px-2 py-2 z-40 ">
                                            <button
                                                onClick={() => handleArchive()}
                                                className="text-center w-full border-y-2 border-primary px-2 hover:bg-primary hover:rounded-t-md hover:text-white transition"
                                            >
                                                {data.public
                                                    ? "Arsipkan"
                                                    : "Public"}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(data.id)
                                                }
                                                className="text-center w-full border-b-2 border-primary px-2 hover:bg-primary hover:rounded-b-md hover:text-white transition"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                    <p
                        className="font-normal"
                        style={{
                            overflowWrap: "break-word",
                        }}
                    >
                        {data.title}
                    </p>
                    {data.filename ? (
                        <div
                            className="relative"
                            style={{
                                maxWidth: "100%",
                                height: "30rem",
                            }}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}uploads/file/${data.filename}`}
                                alt={data.title}
                                fill
                                loading="lazy"
                                className="rounded-xl mt-1 object-cover"
                            />
                        </div>
                    ) : null}
                    <section className="flex gap-5 mt-1">
                        <section className="flex items-center gap-2 text-lg ">
                            <button
                                disabled={active}
                                onClick={() =>
                                    findUser ? unLike(findUser) : handleLike()
                                }
                                className="hover:bg-white/10 hover:text-primary cursor-pointer transition rounded-full p-1"
                            >
                                {findUser ? (
                                    <FaThumbsUp color="#D04848" />
                                ) : (
                                    <FaRegThumbsUp />
                                )}
                            </button>
                            <p>{data?.likes?.length}</p>
                        </section>
                    </section>
                </section>
            </article>
        </>
    );
}
