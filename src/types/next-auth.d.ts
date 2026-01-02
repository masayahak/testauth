import "next-auth";

/**
 * NextAuth.js 型拡張
 * 
 * デフォルトのUser/Sessionにroleプロパティを追加
 */
declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
