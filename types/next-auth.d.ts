import "next-auth";
import "next-auth/jwt";                    // ✨

declare module "next-auth/jwt" {           // ✨ 봉투(token)에도 우리 칸 추가
    interface JWT {
        accessToken?: string;
        expiresIn?: number;
        id?: string;
        profileImageUrl?: string;
    }
}

declare module "next-auth" {
    interface Session {
        accessToken: string;
        expiresIn: number;
        user: {
            id: string;
            email: string;
            name: string;
            profileImageUrl?: string;
        };
    }
    interface User {
        id: string;
        accessToken?: string;
        expiresIn?: number;
        profileImageUrl?: string;
    }
}
