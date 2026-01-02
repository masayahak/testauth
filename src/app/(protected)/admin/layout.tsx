import { requireAdmin } from "@/lib/auth-guard";

/**
 * Admin Layout - 管理者専用レイアウト
 * 
 * AuthGuardパターンの実装例。
 * 親の(protected)/layout.tsxで認証チェック済みの上で、
 * さらに管理者ロールをチェックする（親衛隊）。
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 管理者権限チェック（権限がない場合はホームへリダイレクト）
  await requireAdmin();

  return <>{children}</>;
}

