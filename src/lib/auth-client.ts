import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    fetchOptions: {
        credentials: "include",
    },
});



// export const authClient = createAuthClient({
//     baseURL: "https://server-medi-store-l2-b6-a4.vercel.app",
// });
