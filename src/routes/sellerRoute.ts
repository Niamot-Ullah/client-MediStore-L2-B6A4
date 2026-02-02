import { Route } from "@/types";

export const sellerRoutes: Route[] = [
    {
        title: "Seller Dashboard",
        items: [
            
            {
                title: "Orders",
                url: "/seller-dashboard/orders",
            },
            {
                title: "Add Medicine",
                url: "/seller-dashboard/add-medicine",
            },
            {
                title: "My Posted Medicine",
                url: "/seller-dashboard/posted-medicine",
            },
            {
                title: "My Profile",
                url: "/profile",
            },
            {
                title: "Home",
                url: "/",
            },

        ],
    },


]