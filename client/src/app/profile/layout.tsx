import ProfileContext from "@/libs/context/profileContext";
import ContainerProfile from "@/components/containerProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProfileContext>
            <ContainerProfile>{children}</ContainerProfile>
        </ProfileContext>
    );
}
