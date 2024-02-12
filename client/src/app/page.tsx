"use client";

import { getFile } from "@/libs/axiosService/fileService";

import { useEffect, useState } from "react";

import CardPost from "@/components/cardPost";

export default function Home() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFile().then((res) => {
            const { data } = res;
            setFiles(data.data);
        });
        return () => {};
    }, []);

    return (
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
    );
}
