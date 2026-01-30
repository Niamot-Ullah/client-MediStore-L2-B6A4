import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch session");
      }

      const session = await res.json();
      return { data: session, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
