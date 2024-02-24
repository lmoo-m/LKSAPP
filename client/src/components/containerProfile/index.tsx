"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import ProfileSection from "@/components/ProfileSection";
import Image from "next/image";
import cover from "@/assets/cover.svg";
import NavProfile from "../contentProfile/navProfile";
import { ProfileContextGlobal } from "@/libs/context/profileContext";
import ModalEditProfile from "../contentProfile/modalEditProfile";

export default function ContainerProfile({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = ProfileContextGlobal();
    const [show, setShow] = useState<boolean>(false);
    const modalRef: any = useRef();

    useEffect(() => {
        window.addEventListener("click", (e: any) => {
            if (modalRef.current?.contains(e.target)) {
                setShow(false);
            }
        });
    });

    return (
        <Suspense>
            {show && (
                <ModalEditProfile
                    ref={modalRef}
                    show={show}
                    setShow={setShow}
                />
            )}
            <section className="relative">
                <section className="overflow-hidden relative h-[15rem] ">
                    <Image
                        src={cover}
                        alt={"cover"}
                        width={0}
                        height={10}
                        className="w-full absolute -top-96"
                    />
                </section>
                <div className="flex justify-end px-3 relative">
                    <button
                        onClick={() => setShow(!show)}
                        className="bg-primary rounded-md px-3 mt-1 absolute py-1 font-semibold cursor-pointer z-10 hover:bg-white hover:text-primary transition"
                    >
                        Edit
                    </button>
                </div>
                {/*  */}
                <section className="relative -top-14 ">
                    <ProfileSection
                        createdAt={user?.createdAt}
                        bio={user?.bio}
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
        </Suspense>
    );
}
