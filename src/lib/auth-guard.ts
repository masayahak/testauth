import { auth } from "@/auth";
import { ROLES } from "./constants";

export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === ROLES.ADMIN;
}
