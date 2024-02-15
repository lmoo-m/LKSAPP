"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import listItem from "../ListLink/linkItem";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

export default function Main({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const item: any = listItem.filter((e) => {
        return e.url === pathname;
    })[0];
    const [isTop, setIsTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setIsTop(scrollY === 0 ? false : true);
        });
    });

    return (
        <section className="min-h-screen tracking-wide col-span-4 border-x-2 border-accent bg-secondary">
            <header className="flex justify-between px-4 z-50 border-b-2 border-b-accent py-2 bg-dark sticky top-0">
                <h1 className="font-bold">{item?.title}</h1>
                <span className="text-primary">{item?.icon}</span>
            </header>
            {isTop && (
                <button
                    className="fixed bottom-5 left-[78.7%] z-50 text-2xl transition hover:bg-white/10 rounded-full p-1 "
                    onClick={() => {
                        scroll({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    <MdOutlineKeyboardDoubleArrowUp />
                </button>
            )}

            {children}
        </section>
    );
}
