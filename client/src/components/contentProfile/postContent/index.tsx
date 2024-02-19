import React from "react";
import CardPost from "@/components/cardPost";
import { profileContextGlobal } from "@/libs/context/profileContext";

export default function PostContent() {
    const { user, setUpdate }: any = profileContextGlobal();

    const posts = user?.posts
        ?.filter((a: any) => {
            if (a.public) {
                return a;
            }
            return;
        })
        .reverse();
    return (
        <section>
            {posts?.length !== 0 ? (
                posts?.map((data: any, i: number) => {
                    return (
                        <CardPost
                            controll={true}
                            public={data.public}
                            key={i}
                            id={data.id}
                            likes={data.likes}
                            date={data.date}
                            filename={data.filename}
                            title={data?.title}
                            setUpdate={setUpdate}
                            user={{
                                profile: user?.profile,
                                username: user?.username,
                            }}
                        />
                    );
                })
            ) : (
                <div className="border-t-2 border-accent h-[5rem] grid place-content-center">
                    <h1>
                        Anda tidak memposting sesuatu atau postingan anda
                        diarsipkan
                    </h1>
                </div>
            )}
            <hr className="border-accent border-t-2 w-full" />
        </section>
    );
}
