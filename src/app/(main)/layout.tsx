import { createClient } from "@/lib/supabase/supabaseServer";
import AppSidebar from "@/components/app-sidebar/appsidebar";
import SiteHeader from "@/components/siteheader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div>
            <SiteHeader />
            <UserDetails />
            <main>{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
