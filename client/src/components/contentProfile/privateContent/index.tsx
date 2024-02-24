import React from "react";
import CardPost from "@/components/cardPost";
import { ProfileContextGlobal } from "@/libs/context/profileContext";

export default function PrivateContent() {
    const { user, setUpdate }: any = ProfileContextGlobal();

    const archive = user?.posts
        ?.filter((a: any) => {
            if (!a.public) {
                return a;
            }
            return;
        })
        .reverse();

    return (
        <section>
            {archive?.length !== 0 ? (
                archive.map((data: any, i: number) => {
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
                    <h1>Anda tidak mengarsipkan sesuatu</h1>
                </div>
            )}
            <hr className="border-accent border-t-2 w-full" />
        </section>
    );
}
