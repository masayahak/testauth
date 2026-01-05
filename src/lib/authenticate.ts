"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// useActionState用の型定義
export type State = {
  errors?: string;
  message?: string;
};

export async function authenticate(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: "ユーザー名またはパスワードが間違っています。",
          };
        default:
          return {
            errors: "サーバーエラーが発生しました。",
          };
      }
    }
    // 重要: リダイレクト用のエラーは再スローする
    throw error;
  }

  // ここには到達しない（成功時はリダイレクトされるため）
  return { message: "success" };
}
