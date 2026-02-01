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
        url: "/admin-dashboard/profile",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },


]