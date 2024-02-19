import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    title:'Pengguna'
}

export default function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
