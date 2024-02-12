"use client";

import Profile from "./page";
import ContentProfile from "@/components/contentProfile";
import ProfileSection from "@/components/ProfileSection";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import cover from "@/assets/cover.svg";
import { getToken } from "@/libs/decodeToken";
import { getUser } from "@/libs/axiosService/userService";
import ProfileContext, {
    profileContextGlobal,
} from "@/libs/context/profileContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const decode: any = getToken();
    // const { user, setUser }: any = profileContextGlobal();
    const [user, setUser]: any = useState();
    const p = { username: "s" };

    useEffect(() => {
        getUser(decode.id).then((res: any) => {
            const { data } = res.data;
            console.log(data);
            setUser(data);
        });
        // setUser(true);
        console.log(user);
    }, []);

    return (
        <ProfileContext>
            <section className="relative">
                <section className="overflow-hidden relative h-[15rem]">
                    <Image
                        src={cover}
                        alt={"cover"}
                        width={0}
                        height={10}
                        className="w-full absolute -top-96"
                    />
                </section>
                {/*  */}
                <section className="relative -top-14 ">
                    <ProfileSection
                        username={user?.username}
                        profile={user?.profile}
                    />
                    <ContentProfile
                        files={user?.files}
                        profile={user?.profile}
                        username={user?.username}
                    />
                    {/*  */}
                    {children}
                </section>
            </section>
        </ProfileContext>
    );
}
