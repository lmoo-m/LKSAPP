import React from "react";
import {
    FaThumbsUp,
    FaRegThumbsUp,
    FaRegThumbsDown,
    FaThumbsDown,
} from "react-icons/fa6";
import Image from "next/image";
import defaultPhotoProfile from "@/assets/profile.png";

type userType = {
    profile: string;
    username: string;
};

interface dataProps {
    filename: string;
    title: string;
    user: userType;
    date: string;
}

export default function CardPost(data: dataProps) {
    return (
        <article className="border-t-2 border-accent bg-dark flex py-2 px-4 gap-2 w-full m-h-fit">
            <section>
                <Image
                    src={
                        data.filename
                            ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${data.user.profile}`
                            : defaultPhotoProfile
                    }
                    alt={data.title}
                    width={60}
                    height={20}
                    className="rounded-full"
                />
            </section>

            <section>
                <section className="flex justify-between">
                    <h1 className="text-lg font-semibold">
                        {data.user.username}
                    </h1>
                    <p className="text-end text-sm text-white/40">
                        {data.date}
                    </p>
                </section>
                <p className="font-normal">{data.title}</p>
                <Image
                    src={
                        data.filename
                            ? `${process.env.NEXT_PUBLIC_API_URL}uploads/file/${data.filename}`
                            : defaultPhotoProfile
                    }
                    alt={data.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%" }}
                    className="rounded-xl aspect-video mt-1"
                />
                <section className="flex gap-5 mt-1">
                    <section className="flex items-center gap-2 text-lg ">
                        <span className="hover:bg-white/10 hover:text-primary cursor-pointer transition rounded-full p-1">
                            <FaRegThumbsUp />
                        </span>
                        <p>40</p>
                    </section>
                    <section className="flex items-center gap-2 text-lg">
                        <span className="hover:bg-white/10 hover:text-primary cursor-pointer transition rounded-full p-1">
                            <FaRegThumbsDown />
                        </span>
                        <p>40</p>
                    </section>
                </section>
            </section>
        </article>
    );
}
