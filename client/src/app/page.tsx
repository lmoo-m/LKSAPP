"use client";

import { getUsers } from "@/libs/axiosService/userService";
import Image from "next/image";
import Link from "next/link";
import defaultPhotoProfile from "@/assets/profile.png";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState([]);

    const p = async () => {
        const { data } = await getUsers();
        setUsers(data.data);
    };
    useEffect(() => {
        p();
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center ">
            {users &&
                users.map((data: any, i: number) => {
                    return (
                        <div key={i}>
                            {data.username}
                            <Image
                                src={
                                    data.profile
                                        ? `${process.env.NEXT_PUBLIC_API_URL}uploads/profile/${data.profile}`
                                        : defaultPhotoProfile
                                }
                                alt={data.username}
                                width={400}
                                height={400}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
