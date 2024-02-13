import { ReactNode } from "react";
import PostContent from "../../postContent";

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
        name: "Media",
        active: false,
        url: "/profile?page=media",
        component: <>sdakjd</>,
    },
    {
        name: "Disukai",
        active: false,
        url: "/profile?page=disukai",
        component: <>dsad</>,
    },
    {
        name: "Disimpan",
        active: false,
        url: "/profile?page=disimpan",
        component: <>med</>,
    },
];
