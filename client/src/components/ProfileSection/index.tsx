import React from "react";
import Image from "next/image";
import { MdDateRange } from "react-icons/md";
import defaultPhotoProfile from "@/assets/profile.png";

interface props {
    profile: string;
    username: string;
    bio: string;
    createdAt: string;
}

export default function ProfileSection(user: props) {
    const x = user?.createdAt?.split("-") || "";
    const date = new Date(`${x[0]}-${x[1]}-${x[2]?.split("T")[0]}`);
    const month = date.toLocaleString("id", { month: "long" });

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
                className="rounded-full border-2 border-white aspect-square"
            />
            <h1 className="text-xl font-bold mt-2">{user?.username}</h1>
            <p>{user.bio ? user.bio : "tidak ada bio"}</p>
            <section className="flex text-sm md gap-1 mt-2">
                <MdDateRange className="text-lg" />
                <p>
                    Bergabung {month} {x[0]}
                </p>
            </section>
        </section>
    );
}
