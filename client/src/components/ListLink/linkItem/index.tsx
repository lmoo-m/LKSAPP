import { RiHomeSmileFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { ReactNode } from "react";
import { FaUsers } from "react-icons/fa";

const size = 25;

type itemType = {
    title: string;
    icon: ReactNode;
    url: string;
};

const listItem: itemType[] = [
    {
        title: "Beranda",
        icon: <RiHomeSmileFill size={size} />,
        url: "/",
    },
    {
        title: "Pengguna",
        icon: <FaUsers size={size} />,
        url: "/users",
    },
    {
        title: "Profile",
        icon: <IoPersonSharp size={size} />,
        url: "/profile",
    },
];

export default listItem;
