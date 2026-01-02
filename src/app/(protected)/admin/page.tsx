import { auth } from "@/auth";

/**
 * 管理者専用ページ
 * 
 * 認証チェック: (protected)/layout.tsx で実施
 * 権限チェック: admin/layout.tsx で実施（AuthGuardパターン）
 * 
 * このページに到達した時点で、ユーザーは認証済み＆管理者権限を持っている
 */
export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-zinc-50">
          管理者専用画面
        </h1>
        <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
          この画面は管理者のみがアクセスできます。
        </p>
        <div className="rounded-md bg-green-100 p-4 dark:bg-green-900">
          <p className="text-green-800 dark:text-green-200">
            ログイン中のユーザー: {session?.user?.name}
          </p>
          <p className="text-green-800 dark:text-green-200">
            ロール: {session?.user?.role}
          </p>
        </div>
      </div>
    </div>
  );
}
