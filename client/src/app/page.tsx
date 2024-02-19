"use client";

import { getFile } from "@/libs/axiosService/postService";
import { useEffect, useState } from "react";
import CardPost from "@/components/cardPost";
import { getToken } from "@/libs/decodeToken";
import FormInput from "@/components/formInput";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState<any>();
    const [update, setUpdate] = useState<number>();

    useEffect(() => {
        const token: any = getToken();
        setUser(token);
        getFile().then((res) => {
            const { data } = res;
            setFiles(data.data);
        });
        return () => {};
    }, [update]);

    // console.log(files);

    files
        .sort((a: any, b: any) => {
            return a?.id - b?.id;
        })
        .reverse();
    return (
        <section>
            {user && <FormInput user={user} setUpdate={setUpdate} />}

            <div className="flex flex-col items-center mt-5">
                {files.length !== 0 ? (
                    files.map((data: any, i: number) => {
                        return (
                            <CardPost
                                key={i}
                                setUpdate={setUpdate}
                                id={data.id}
                                likes={data.likes}
                                date={data.date}
                                filename={data.filename}
                                title={data?.title}
                                user={data.user}
                            />
                        );
                    })
                ) : (
                    <div className="border-t-2 border-accent h-[5rem] grid place-content-center w-full">
                        <h1>Tidak postingan</h1>
                    </div>
                )}
                <hr className="border-accent border-t-2 w-full" />
            </div>
        </section>
    );
}
