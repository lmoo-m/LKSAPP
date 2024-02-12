"use client";

import React, { createContext, useContext, useState } from "react";

type fileType = {
    filename: string;
    title: string;
    id: number;
    date: string;
};

type userType = {
    username: string;
    profile: string;
    id?: number;
    files: fileType[];
};

type profileType = {
    user: any;
    // setUser: React.Dispatch<React.SetStateAction<userType>>;
    updateState: () => void;
};

export const Profile = createContext<any>({
    user: {
        files: [],
        username: "",
        profile: "",
    },
    setUser: (): boolean => false,
});

export default function ProfileContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>({
        files: [],
        username: "",
        profile: "",
    });

    // console.log(user);

    return (
        <Profile.Provider value={{ user, setUser }}>
            {children}
        </Profile.Provider>
    );
}

export const profileContextGlobal = () => useContext(Profile);
