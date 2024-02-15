import { RiHomeSmileFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { ReactNode } from "react";

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
        title: "Profile",
        icon: <IoPersonSharp size={size} />,
        url: "/profile",
    },
    {
        title: "File",
        icon: <FaFile size={size} />,
        url: "/file",
    },
];

export default listItem;
