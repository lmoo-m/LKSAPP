"use client";

import { usePathname } from "next/navigation";
import React from "react";
import listItem from "../ListLink/linkItem";

export default function Main({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const item: any = listItem.filter((e) => e.url === pathname)[0];

    return (
        <section className="min-h-screen tracking-wide col-span-4 border-x-2 border-accent bg-secondary ">
            <header className="flex justify-between px-4 z-50 border-b-2 border-b-accent py-2 bg-dark sticky top-0">
                <h1 className="font-bold">{item?.title}</h1>
                <span className="text-primary">{item?.icon}</span>
            </header>
            {children}
        </section>
    );
}
