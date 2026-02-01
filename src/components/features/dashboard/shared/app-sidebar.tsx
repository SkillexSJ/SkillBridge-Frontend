"use client";

/**
 * NODE PACKAGES
 */
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

/**
 * COMPONENTS
 */
import { NavMain } from "@/components/features/dashboard/nav-main";
import { NavSecondary } from "@/components/features/dashboard/nav-secondary";
import { NavUser } from "@/components/features/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * CONFIG
 */
import { dashboardConfig, UserRole } from "../dashboard-config";

// for fallback
const defaultUser = {
  name: "Guest User",
  email: "guest@skillbridge.com",
  avatar: "",
};

/**
 * INTERFACE
 */
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role?: UserRole;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({
  role = "student",
  user = defaultUser,
  ...props
}: AppSidebarProps) {
  const config = dashboardConfig[role];
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  //hydration fix
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "light" ? "/logoblack.svg" : "/logo.svg";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image
                  src={logoSrc}
                  className=" object-contain translate-x-4"
                  alt="Skill Bridge"
                  width={240}
                  height={240}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={config.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
