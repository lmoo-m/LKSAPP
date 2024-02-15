import React from "react";
import Image from "next/image";
import defaultPhotoProfile from "@/assets/profile.png";

type userType = {
    profile: string;
};

interface props {
    user: userType;
    width?: number;
    heigth?: number;
}

export default function PhotoProfile(data: props) {
    return (
        <span
            className="relative block rounded-full border-2 "
            style={{
                width: data.width || "4rem",
                height: data.heigth || "4rem",
            }}
        >
            <Image
                src={
                    data.user.profile
                        ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${data.user.profile}`
                        : defaultPhotoProfile
                }
                layout="fill"
                alt={"profile"}
                // width={data.width || 60}
                // height={data.heigth || 20}
                className="rounded-full"
            />
        </span>
    );
}
