import { Home, ListMusic, Rss, ShoppingCart, Users } from "lucide-react";

export const dashboardList = [
  {
    name: "Dashboard",
    path: "/dashboard",
    tooltip: "Dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    tooltip: "Orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    name: "Beats",
    path: "/dashboard/beats",
    tooltip: "Beats",
    icon: <ListMusic className="w-5 h-5" />,
  },
  {
    name: "Blogs",
    path: "/dashboard/blogs",
    tooltip: "Blogs",
    icon: <Rss className="w-5 h-5" />,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    tooltip: "Users",
    icon: <Users className="w-5 h-5" />,
  },
];
