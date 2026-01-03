import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Middleware - 門番（検問）
 *
 * ページが表示される「前」に全リクエストを検閲する。
 * 役割: 認証チェックのみ（ログイン済みかどうか）
 *
 * ※ 権限チェック（管理者か一般か）は AuthGuard が担当する
 */

// 認証が不要なパブリックパス
const publicPaths = ["/login"];

// 認証が必要な保護パス（これらのパスは未認証ユーザーをリダイレクト）
const protectedPaths = ["/admin", "/user"];

/**
 * パスがパターンにマッチするかチェック
 */
function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`)
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // 保護パス: 未認証ならログインへリダイレクト
  if (matchesPath(pathname, protectedPaths)) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // パブリックパス: ログイン済みならホームへリダイレクト
  if (matchesPath(pathname, publicPaths)) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  // 静的ファイルとAPIルートを除外
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
