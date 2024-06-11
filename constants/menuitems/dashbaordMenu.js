import {
  Home,
  ListMusic,
  Rss,
  ShoppingCart,
  User2,
  User2Icon,
  Users,
} from "lucide-react";
import { FaBlog } from "react-icons/fa6";

export const dashboardList = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <Home />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: <User2 />,
    roles: ["admin", "user"],
  },
  {
    path: "/dashboard/beats",
    name: "Beats",
    icon: <ListMusic />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/blogs",
    name: "Blog",
    icon: <FaBlog />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <User2Icon />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/clientele",
    name: "Clientele",
    icon: <Rss />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    icon: <ShoppingCart />,
    roles: ["admin", "user"],
  },
];
