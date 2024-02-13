"use client";

import { getFile } from "@/libs/axiosService/fileService";

import { useEffect, useState } from "react";

import CardPost from "@/components/cardPost";
import PhotoProfile from "@/components/photoProfile";
import { getToken } from "@/libs/decodeToken";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const token: any = getToken();
        setUser(token);
        getFile().then((res) => {
            const { data } = res;
            setFiles(data.data);
        });
        return () => {};
    }, []);

    return (
        <>
            <section className="px-5 bg-dark border-b-2 border-b-accent py-3 flex gap-3">
                <PhotoProfile
                    width={40}
                    heigth={40}
                    filename={user?.username}
                    title={user?.username}
                    user={user}
                />
                <section className="w-full">
                    <input
                        placeholder="apa yang kamu pikirkan?"
                        className="bg-dark outline-none w-full  overflow-visible"
                    />
                </section>
            </section>

            <div className="flex flex-col items-center mt-5">
                {files &&
                    files.map((data: any, i: number) => {
                        return (
                            <CardPost
                                key={i}
                                date={data.date}
                                filename={data.filename}
                                title={data?.title}
                                user={data.user}
                            />
                        );
                    })}
            </div>
        </>
    );
}
