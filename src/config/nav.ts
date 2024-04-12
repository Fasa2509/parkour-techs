import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon, Activity, AlbumIcon, SearchCode, Outdent } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/", title: "Get started", icon: Globe },
  { href: "/account", title: "Account", icon: Activity },
  { href: "/settings", title: "Settings", icon: Cog },
  { href: "/management", title: "Management", icon: AlbumIcon },
  { href: "/search", title: "Search Workers", icon: SearchCode },
  { href: "#", title: "Sign out", icon: Outdent },
];

export const additionalLinks: AdditionalLinks[] = [];
