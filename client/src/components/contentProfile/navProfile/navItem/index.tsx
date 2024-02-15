import { ReactNode } from "react";
import PostContent from "../../postContent";
import LikeContent from "../../likeContent";
import PrivateContent from "../../privateContent";

type itemType = {
    name: string;
    active: boolean;
    url: string;
    component: ReactNode;
};

export const navItem: itemType[] = [
    {
        name: "Postingan",
        active: true,
        url: "/profile",
        component: <PostContent />,
    },
    {
        name: "Arsip",
        active: false,
        url: "/profile?page=arsip",
        component: <PrivateContent />,
    },
    {
        name: "Disukai",
        active: false,
        url: "/profile?page=disukai",
        component: <LikeContent />,
    },
    // {
    //     name: "Disimpan",
    //     active: false,
    //     url: "/profile?page=disimpan",
    //     component: <>med</>,
    // },
];
