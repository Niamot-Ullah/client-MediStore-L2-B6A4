import { Route } from "@/types";

export const customerRoutes : Route[] = [
    {
      title: "Customer Dashboard",
      items: [
        {
          title: "Orders",
          url: "/dashboard/orders",
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