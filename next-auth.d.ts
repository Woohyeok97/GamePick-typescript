// 이파일에서는 세션타입을 정의함
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string;
            email: string;
            image?: string;
        };
    }
}