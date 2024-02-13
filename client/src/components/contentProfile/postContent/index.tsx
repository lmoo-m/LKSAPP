import React from "react";
import CardPost from "@/components/cardPost";
import { profileContextGlobal } from "@/libs/context/profileContext";

export default function PostContent() {
    const { user }: any = profileContextGlobal();

    return (
        <section>
            {user?.files &&
                user?.files.map((data: any, i: number) => {
                    return (
                        <CardPost
                            key={i}
                            date={data.date}
                            filename={data.filename}
                            title={data?.title}
                            user={{
                                profile: user?.profile,
                                username: user?.username,
                            }}
                        />
                    );
                })}
        </section>
    );
}
