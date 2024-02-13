import React from "react";
import Image from "next/image";
import defaultPhotoProfile from "@/assets/profile.png";

type userType = {
    profile: string;
};

interface props {
    filename: string;
    user: userType;
    title: string;
    width?: number;
    heigth?: number;
}

export default function PhotoProfile(data: props) {
    return (
        <Image
            src={
                data.filename
                    ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${data.user.profile}`
                    : defaultPhotoProfile
            }
            alt={data.title || "profile"}
            width={data.width || 60}
            height={data.heigth || 20}
            className="rounded-full"
        />
    );
}
