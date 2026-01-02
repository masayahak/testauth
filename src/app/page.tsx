import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
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

          {session ? (
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
              <p className="text-zinc-600 dark:text-zinc-400">
                上部のメニューからページを選択してください
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                ログインして機能を利用してください
              </p>
              <Link
                href="/login"
                className="inline-block rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                ログインページへ
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
