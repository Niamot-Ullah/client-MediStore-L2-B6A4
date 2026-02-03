"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;


export async function updateUserStatus(
    userId: string,
    status: string
) {
    const cookieStore = await cookies();

    const res = await fetch(
        `${API_URL}/api/users/status/${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ status }),
        }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to update status");
    }


    revalidatePath("/admin-dashboard/users");
}
