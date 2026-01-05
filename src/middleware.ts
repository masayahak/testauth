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

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { nextUrl } = req;

  // 1. ログインページにいる場合、ログイン済みならルートへ飛ばす（逆流防止）
  if (nextUrl.pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return null; // ログインページを表示
  }

  // 2. それ以外のページ（ルート含む）で、未ログインならログインへ飛ばす
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return null; // 通過許可
});

export const config = {
  // 静的ファイルとAPIルートを除外
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
