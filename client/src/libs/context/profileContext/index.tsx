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
    u: "kdj",
    setU: (): string => "kdj",
});

export default function ProfileContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<any>("pertama");
    const [update, setUpdate] = useState<number>();

    return (
        <Profile.Provider value={{ user, setUser, update, setUpdate }}>
            {children}
        </Profile.Provider>
    );
}

export const profileContextGlobal = () => useContext(Profile);
