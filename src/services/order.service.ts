import { env } from "@/env"


const API_URL = env.NEXT_PUBLIC_API_URL


interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}


export const orderService = {
    // getAllOrders: async function (params?: getMedicineParams, options?: ServiceOption) {
    //     try {
    //         const url = new URL(`${API_URL}/api/orders`)

    //         if (params) {
    //             Object.entries(params).forEach(([key, value]) => {
    //                 if (value !== undefined && value !== null && value !== "") {
    //                     url.searchParams.append(key, value)
    //                 }
    //             })
    //         }
    //         const config: RequestInit = {};
    //         if (options?.cache) {
    //             config.cache = options.cache;
    //         }
    //         if (options?.revalidate) {
    //             config.next = { revalidate: options.revalidate };
    //         }
    //         const res = await fetch(url.toString(), config)
    //         const data = await res.json()
    //         return { data: data, error: null }
    //     } catch (error) {
    //         return { data: null, error: error || "Something went wrong" }
    //     }
    // },
    getMyOrder: async function () {
        try {
            const res = await fetch(`${API_URL}/api/orders/my`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });


            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch my orders");
            }

            const data = await res.json();
            console.log(data);
            return { data, error: null };

        } catch (error) {
            return { data: null, error };
        }
    },
    

    createOrder: async function (
        medicineId: string,
        payload: {
            quantity: number
            shippingAddress: string
        }
    ) {
        try {
            const res = await fetch(`${API_URL}/api/orders/${medicineId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to create order")
            }

            const data = await res.json()
            return { data, error: null }

        } catch (error) {
            return { data: null, error }
        }
    },
    cancelOrder: async function (orderId: string) {
        try {
            const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to cancel order");
            }

            const data = await res.json();
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    },



}

