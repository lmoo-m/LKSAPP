"use client";

import React from "react";
import AuthContext from "./authContext";

export default function Context({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthContext>{children}</AuthContext>
        </>
    );
}
