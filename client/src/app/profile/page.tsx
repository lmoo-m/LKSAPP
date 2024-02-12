"use client";

import React, { useEffect, useState } from "react";
import cover from "@/assets/cover.svg";
import Image from "next/image";
import ContentProfile from "@/components/contentProfile";
import { profileContextGlobal } from "@/libs/context/profileContext";

const Profile = () => {
    const { user }: any = profileContextGlobal();

    // console.log(user);

    return (
        <>
            {/*  */}
            <ContentProfile
                files={user.files}
                profile={user.profile}
                username={user.username}
            />
        </>
    );
};

export default Profile;
