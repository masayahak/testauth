import { auth, signOut } from "@/auth";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            TestAuth
          </Link>
          <NavLinks isAdmin={session?.user?.role === "管理者"} />
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {session.user?.name}{" "}
                <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                  {session.user?.role}
                </span>
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              ログイン
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
