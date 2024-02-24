import React from "react";
import CardPost from "@/components/cardPost";
import { ProfileContextGlobal } from "@/libs/context/profileContext";

export default function LikeContent() {
    const { user, setUpdate }: any = ProfileContextGlobal();

    return (
        <section>
            {user?.likes?.length !== 0 ? (
                user?.likes
                    ?.filter((a: any) => {
                        if (a.post.public) {
                            return a;
                        }
                        return;
                    })
                    .reverse()
                    .map((data: any, i: number) => {
                        return (
                            <CardPost
                                key={i}
                                id={data.post?.id}
                                public={data.post?.public}
                                likes={data.post?.likes}
                                date={data.post?.date}
                                filename={data.post?.filename}
                                title={data?.post?.title}
                                setUpdate={setUpdate}
                                user={{
                                    profile: data?.post?.user?.profile,
                                    username: data.post?.user?.username,
                                }}
                            />
                        );
                    })
            ) : (
                <div className="border-t-2 border-accent h-[5rem] grid place-content-center">
                    <h1>Tidak ada yang disukai</h1>
                </div>
            )}
            <hr className="border-accent border-t-2 w-full" />
        </section>
    );
}
