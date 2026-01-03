import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * ユーザーロールの型定義
 */
export type UserRole = "管理者" | "一般";

/**
 * AuthGuard - 権限チェックユーティリティ（親衛隊）
 * 
 * Middlewareが認証（ログイン済みかどうか）をチェックした後、
 * このユーティリティで権限（ロール）をチェックする。
 */

/**
 * 認証済みセッションを取得する
 * 未認証の場合はログインページにリダイレクト
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  return session;
}

/**
 * 指定されたロールを持つユーザーのみアクセスを許可
 * @param allowedRoles - 許可するロールの配列
 * @param redirectTo - 権限がない場合のリダイレクト先（デフォルト: "/"）
 */
export async function requireRole(
  allowedRoles: UserRole[],
  redirectTo: string = "/"
) {
  const session = await requireAuth();
  
  const userRole = session.user?.role as UserRole | undefined;
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    redirect(redirectTo);
  }
  
  return session;
}

/**
 * 管理者のみアクセスを許可
 */
export async function requireAdmin() {
  return requireRole(["管理者"]);
}

/**
 * ユーザーが特定のロールを持っているかチェック（リダイレクトなし）
 */
export async function hasRole(role: UserRole): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === role;
}

/**
 * ユーザーが管理者かどうかチェック（リダイレクトなし）
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole("管理者");
}

