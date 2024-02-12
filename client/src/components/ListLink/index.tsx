import React from "react";
import { RiHomeSmileFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import listItem from "./linkItem";

export default function ListLink() {
    const pathname = usePathname();

    return (
        <section className="flex flex-col items-center w-full justify-center gap-5">
            {listItem.map((item, i) => {
                return (
                    <section
                        key={i}
                        className={`${
                            pathname === item.url
                                ? "text-primary"
                                : "text-white"
                        } flex items-center gap-5 w-full transition px-5 hover:text-primary`}
                    >
                        {item.icon}
                        <Link href={item.url} className="text-lg font-semibold">
                            {item.title}
                        </Link>
                    </section>
                );
            })}
        </section>
    );
}
