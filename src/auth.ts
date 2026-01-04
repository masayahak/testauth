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
    /*
    この設定の挙動シミュレーション
      10:00 ログイン: 有効期限は 10:30 です。
      10:04 操作: 前回更新から5分経っていないので、更新されません。（期限 10:30 のまま）
      10:06 操作: 前回から5分以上経過したので、セッションが更新されます。有効期限が 10:36 に延長されます。
      10:06 〜 10:37 放置 (31分): 操作がないまま有効期限（10:36）を過ぎます。
      10:38 操作: 有効期限切れのため、ログアウト状態になります。
    */
    maxAge: 30 * 60, // 30分 (これが本当の寿命)
    updateAge: 5 * 60, // 5分 (5分経過するたびに、寿命を「現在+30分」にリセットする)
  },
  pages: {
    signIn: "/login",
  },
});
