import { getToken } from "@/libs/decodeToken";
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

const withAuth = (middleware: NextMiddleware, require: string[] = []) => {
    return (req: NextRequest, next: NextFetchEvent) => {
        const { pathname } = req.nextUrl;
        const token = req.cookies.get("token");

        if (require.includes(pathname)) {
            if (!token) {
                const url = new URL("/login", req.url);
                return NextResponse.redirect(url);
            }
        }
        return middleware(req, next);
    };
};

export default withAuth;
