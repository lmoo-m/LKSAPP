import ProfileContext from "@/libs/context/profileContext";
import ContainerProfile from "@/components/containerProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProfileContext>
            <ContainerProfile>{children}</ContainerProfile>
        </ProfileContext>
    );
}
