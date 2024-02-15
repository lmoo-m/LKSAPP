import React from "react";
import CardPost from "@/components/cardPost";
import { profileContextGlobal } from "@/libs/context/profileContext";

export default function PrivateContent() {
    const { user, setUpdate }: any = profileContextGlobal();

    return (
        <section>
            {user?.posts &&
                user?.posts
                    .filter((a: any) => {
                        if (!a.public) {
                            return a;
                        }
                        return;
                    })
                    .reverse()
                    .map((data: any, i: number) => {
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
                    })}
            <hr className="border-accent border-t-2 w-full" />
        </section>
    );
}
