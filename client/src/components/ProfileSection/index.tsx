import React from "react";
import Image from "next/image";
import { MdDateRange } from "react-icons/md";
import defaultPhotoProfile from "@/assets/profile.png";

interface props {
    profile: string;
    username: string;
}

export default function ProfileSection(user: props) {
    return (
        <section className="px-3">
            <Image
                src={
                    user?.profile
                        ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${user?.profile}`
                        : defaultPhotoProfile
                }
                alt={user?.username ? user?.username : "profile"}
                width={110}
                height={20}
                className="rounded-full border-2 border-secondary bg-accent"
            />
            <h1 className="text-xl font-bold mt-2">{user?.username}</h1>
            <p>Product Designer</p>
            <section className="flex text-sm md gap-1 mt-2">
                <MdDateRange className="text-lg" />
                <p>Bergabung September 2024</p>
            </section>
        </section>
    );
}
