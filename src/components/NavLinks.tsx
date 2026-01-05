"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

export default function NavLinks({ isLoggedIn, isAdmin }: NavLinksProps) {
  const pathname = usePathname();

  // 未ログインなら何も表示しない
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {/* 管理者ページへのリンクは、管理者のみ表示 */}
      {isAdmin && (
        <Link
          href="/admin"
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            pathname === "/admin"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          }`}
        >
          管理者ページ
        </Link>
      )}
      <Link
        href="/user"
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          pathname === "/user"
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        }`}
      >
        一般ページ
      </Link>
    </div>
  );
}
