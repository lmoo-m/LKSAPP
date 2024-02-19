"use client";

import PhotoProfile from "@/components/photoProfile";
import { getUsers } from "@/libs/axiosService/userService";
import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";

export default function Users() {
    const [users, setUser] = useState<any>([]);

    useEffect(() => {
        getUsers().then((res: any) => {
            const { data } = res.data;
            setUser(data);
        });
    }, []);

    return (
        <section className="mt-2 ">
            {users?.map((user: any, i: number) => {
                const x = user?.createdAt?.split("-") || "";
                const date = new Date(`${x[0]}-${x[1]}-${x[2]?.split("T")[0]}`);
                const month = date.toLocaleString("id", { month: "long" });

                return (
                    <article
                        key={i}
                        className="border-t-2 border-accent py-2 px-2 flex justify-between"
                    >
                        <section className="flex gap-2">
                            <PhotoProfile user={user} />
                            <section>
                                <h1 className="text-2xl font-semibold">
                                    {user?.username}
                                </h1>
                                <section className="flex text-sm md gap-1 mt-2">
                                    <MdDateRange className="text-lg" />
                                    <p>
                                        Bergabung {month} {x[0]}
                                    </p>
                                </section>
                            </section>
                        </section>
                        <button className="bg-primary rounded-md py-2 self-center px-3 hover:bg-white hover:text-primary transition font-semibold">
                            Kunjungi
                        </button>
                    </article>
                );
            })}
            <hr className="border-t-2 border-accent" />
        </section>
    );
}
