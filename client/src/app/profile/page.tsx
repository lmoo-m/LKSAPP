"use client";

import React, { useEffect } from "react";
import { getUser } from "@/libs/axiosService/userService";
import { ProfileContextGlobal } from "@/libs/context/profileContext";
import { getToken } from "@/libs/decodeToken";
import PostContent from "@/components/contentProfile/postContent";
import { navItem } from "@/components/contentProfile/navProfile/navItem";
import { useSearchParams } from "next/navigation";

const Profile = () => {
    const decode: any = getToken();
    const { setUser, update }: any = ProfileContextGlobal();
    const params = useSearchParams();

    const selectItem = navItem.find(
        (e) => e.name.toLocaleLowerCase() === params.get("page")
    );

    useEffect(() => {
        getUser(decode?.id).then((res: any) => {
            const { data } = res.data;
            setUser(data);
        });
    });

    return (
        <section>
            {selectItem?.component ? selectItem.component : <PostContent />}
        </section>
    );
};

export default Profile;
