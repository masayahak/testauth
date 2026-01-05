import { auth } from "@/auth";

export default async function Home() {
  // Middlewareを通過しているため、sessionは基本的に存在する前提
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-zinc-50">
            ようこそ
          </h1>
          <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
            NextAuth v5を使用した認証システムのデモです
          </p>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
            <p className="mb-2 text-xl font-semibold text-black dark:text-zinc-50">
              こんにちは、{session?.user?.name || "ユーザー"} さん
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              認証に成功しています。
              <br />
              上部のメニューから、権限に応じたページへ移動できます。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
