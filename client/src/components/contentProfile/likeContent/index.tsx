import React from "react";
import CardPost from "@/components/cardPost";
import { profileContextGlobal } from "@/libs/context/profileContext";

export default function LikeContent() {
    const { user, setUpdate }: any = profileContextGlobal();

    return (
        <section>
            {user?.likes &&
                user?.likes
                    .sort((a: any, b: any) => {
                        return a?.id - b?.id;
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
                    })}
            <hr className="border-accent border-t-2 w-full" />
        </section>
    );
}
