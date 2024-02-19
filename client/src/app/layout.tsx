import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import Context from "@/libs/context";
import ContainerMain from "@/components/containerMain";

const inter = Noto_Sans_Display({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
    title: "Beranda",
    description: "Sosmed",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-dark text-white min-h-screen`}
            >
                <Context>
                    <main className="container mx-auto">
                        <ContainerMain>{children}</ContainerMain>
                    </main>
                </Context>
            </body>
        </html>
    );
}
