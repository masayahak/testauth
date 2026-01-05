"use client";

import { authenticate } from "@/lib/authenticate";
import { useActionState } from "react";

export default function LoginPage() {
  // 第1引数: Server Action, 第2引数: 初期状態
  const [state, dispatch, isPending] = useActionState(authenticate, {
    message: undefined,
    errors: undefined,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-bold text-black dark:text-zinc-50">
          ログイン
        </h1>
        <form action={dispatch} className="space-y-4">
          {" "}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black dark:text-zinc-50"
            >
              ユーザー名
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="admin または user"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black dark:text-zinc-50"
            >
              パスワード
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="admin123 または user123"
            />
          </div>
          {/* エラー表示 */}
          {state.errors && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
              {state.errors}
            </div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending ? "ログイン中..." : "ログイン"}
          </button>
        </form>
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          <p className="mb-2 font-semibold">テストアカウント:</p>
          <p>管理者: admin / admin123</p>
          <p>一般: user / user123</p>
        </div>

        {/* Footer */}
        <footer className="mt-8 mb-4 text-lg text-center text-gray-200">
          <div className="mb-2">
            <span>Developed by </span>
            <a
              href="https://hakamata-soft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              HakamataSoft
            </a>
          </div>

          <div className="flex text-xs items-center justify-center gap-2">
            <span className="text-gray-200">Powered by</span>
            {/* Next.js のブランドカラー (黒/白) */}
            <span className="bg-black text-white px-2 py-0.5 rounded font-bold">
              Next.js
            </span>
            <span className="text-gray-800">&</span>
            {/* Tailwind CSS のブランドカラー (シアン) */}
            <span className="bg-cyan-500 text-white px-2 py-0.5 rounded font-bold">
              Tailwind CSS
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
