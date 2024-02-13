"use client";

import React from "react";
import ProfileSection from "@/components/ProfileSection";
import Image from "next/image";
import cover from "@/assets/cover.svg";
import NavProfile from "../contentProfile/navProfile";
import { profileContextGlobal } from "@/libs/context/profileContext";

export default function ContainerProfile({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = profileContextGlobal();

    return (
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
                {/*  */}
                <section className="mt-5">
                    <NavProfile />
                    {children}
                </section>
            </section>
        </section>
    );
}
