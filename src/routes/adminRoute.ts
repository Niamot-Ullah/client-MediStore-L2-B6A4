import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "analytics",
        url: "/admin-dashboard/analytics",
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