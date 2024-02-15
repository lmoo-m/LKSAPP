import { Dispatch } from "react";

type userType = {
    profile: string;
    username: string;
};

export interface dataProps {
    id: number;
    filename: string;
    title: string;
    user: userType;
    date: string;
    likes: any;
    public?: boolean;
    setUpdate?: Dispatch<number>;
    controll?: boolean;
}
