import {
  Home,
  ListMusic,
  Rss,
  ShoppingCart,
  User2Icon,
  Users,
} from "lucide-react";
import { FaBlog } from "react-icons/fa6";

export const dashboardList = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <Home />,
    roles: ["admin", "user"],
  },
  {
    path: "/dashboard/beats",
    name: "Music",
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
    path: "/dashboard/profile",
    name: "Profile",
    icon: <Rss />,
    roles: ["admin", "user"], // Updated to include admin
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    icon: <ShoppingCart />,
    roles: ["admin", "user"], // Updated to include admin
  },
  // Add other routes here
];
