import { env } from "@/env"


const API_URL = env.NEXT_PUBLIC_API_URL


interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}


export const reviewService = {
    createReview: async function (
        medicineId: string,
        payload: {
            rating: number
            comment: string
        }
    ) {
        try {
            const res = await fetch(`${API_URL}/api/reviews/${medicineId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to create review")
            }

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error }
        }
    },


}

