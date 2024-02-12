import React from "react";
import CardPost from "@/components/cardPost";
import NavProfile from "./navProfile";

type fileType = {
    date: string;
    filename: string;
    title: string;
};

interface props {
    files: fileType[];
    profile: string;
    username: string;
}

export default function ContentProfile(user: props) {
    return (
        <section className="mt-5">
            <NavProfile />
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
        </section>
    );
}
