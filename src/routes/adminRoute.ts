import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "User Management",
        url: "/admin-dashboard/users",
      },
      {
        title: "Medicines",
        url: "/admin-dashboard/medicines",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Add Category",
        url: "/admin-dashboard/add-category",
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