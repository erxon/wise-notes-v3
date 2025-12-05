import AppSidebar from "@/components/app-sidebar/appsidebar";
import SiteHeader from "@/components/siteheader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div>
            <SiteHeader />
            <main>{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
