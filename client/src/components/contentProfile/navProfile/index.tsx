import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { navItem } from "./navItem";

export default function NavProfile() {
    const params = useSearchParams();

    return (
        <nav className="flex justify-around sticky top-[2.70rem] bg-secondary z-40">
            {navItem.map((data, i) => {
                return (
                    <Link
                        href={data.url}
                        key={i}
                        className={`font-bold ${
                            params.get("page") ===
                                data.name.toLocaleLowerCase() ||
                            (params.get("page") === null && i == 0)
                                ? "text-primary border-b-primary"
                                : "text-white/50 border-primary/0"
                        } border-b-2  hover:border-primary hover:text-primary transition inline pb-2 pt-1 px-3 cursor-pointer`}
                    >
                        {data.name}
                    </Link>
                );
            })}
        </nav>
    );
}
