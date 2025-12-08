import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import {
  IconNotebook,
  IconBlocks,
  IconCirclePlusFilled,
} from "@tabler/icons-react";

const pages = [
  {
    id: 1,
    name: "Notebooks",
    link: "/notebooks",
    icon: IconNotebook,
  },
  {
    id: 2,
    name: "Projects",
    link: "/projects",
    icon: IconBlocks,
  },
];

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Create Notebook</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {pages.map((page) => (
          <SidebarMenu key={page.id}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={page.link}>
                  {page.icon && <page.icon />}
                  <span>{page.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
