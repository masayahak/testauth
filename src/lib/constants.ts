export const ROLES = {
  ADMIN: "管理者",
  USER: "一般",
} as const;

// 型も自動生成 ( "管理者" | "一般" 型になる )
export type UserRole = typeof ROLES[keyof typeof ROLES];