import React from "react";

const navItem = [
    {
        name: "Postingan",
        active: true,
    },
    {
        name: "Media",
        active: false,
    },
    {
        name: "Disukai",
        active: false,
    },
    {
        name: "Disimpan",
        active: false,
    },
];

export default function NavProfile() {
    const handleClick = (id: number) => {
        const itemSelect = navItem[id];
        itemSelect.active = true;
        console.log(itemSelect);
    };

    return (
        <nav className="flex justify-around sticky top-11 bg-secondary">
            {navItem.map((data, i) => {
                return (
                    <h1
                        key={i}
                        onClick={() => handleClick(i)}
                        className={`font-bold ${
                            data.active
                                ? "text-primary border-b-primary"
                                : "text-white/50 border-primary/0"
                        } border-b-2  hover:border-primary hover:text-primary transition inline pb-2 px-3 cursor-pointer`}
                    >
                        {data.name}
                    </h1>
                );
            })}
        </nav>
    );
}
