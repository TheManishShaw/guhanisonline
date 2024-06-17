import {
  BookUser,
  Home,
  ListMusic,
  Rss,
  ShoppingCart,
  User2,
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
    icon: <Users />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/clientele",
    name: "Clientele",
    icon: <BookUser />,
    roles: ["admin"],
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    icon: <ShoppingCart />,
    roles: ["admin", "user"],
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: <User2 />,
    roles: ["admin", "user"],
  },
];
