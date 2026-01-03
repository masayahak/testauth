import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * NextAuth.js v5 (Auth.js) 設定
 *
 * 認証の専門家（ブラックボックス）として以下を担当:
 * - ログイン処理（Credentials Provider）
 * - セッション管理（Cookie/JWT）
 * - 暗号化
 *
 * ※ 権限チェック（ロール）は AuthGuard が担当
 */

// ダミーユーザーデータ（本番環境ではDBを使用）
// パスワードはbcryptでハッシュ化済み
const users = [
  {
    id: "1",
    username: "admin",
    // 元のパスワード: admin123
    passwordHash:
      "$2b$10$ZObeW92VdQhCjTnZIO5xyewwtbMvVZbTQDpvex3wbObyP5Fy0GI9C",
    role: "管理者" as const,
  },
  {
    id: "2",
    username: "user",
    // 元のパスワード: user123
    passwordHash:
      "$2b$10$FxG5IygF87OfTX9yhgUNL.HigPU5tpq1.riV7CU0C4RdQGj4GhafC",
    role: "一般" as const,
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },

      // ログイン画面のsignInで実行される認証ロジック
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // ユーザー名でユーザーを検索
        const user = users.find((u) => u.username === credentials.username);

        if (!user) {
          return null;
        }

        // bcryptでパスワードを検証
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // JWTトークンにロール情報を追加
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // セッションにロール情報を追加
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1日に変更（デフォルトは３０日）
    updateAge: 60 * 60, // 1時間ごとに変更（デフォルトは１日）
  },
  pages: {
    signIn: "/login",
  },
});
