import { requireAuth } from "@/lib/auth-guard";
import Navigation from "@/components/Navigation";

/**
 * Protected Layout - 認証済みユーザー専用レイアウト
 *
 * Route Group `(protected)` 配下のすべてのページに適用される。
 * Middlewareで認証チェック済みだが、二重チェックとして
 * AuthGuardのrequireAuthを使用する。
 *
 * ※ URLには影響しない（Route Groupの特性）
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 認証チェック（未認証の場合はログインページへリダイレクト）
  // middleware.tsでも認証チェックしているが、ここでさらに２重チェックしている
  await requireAuth();

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
