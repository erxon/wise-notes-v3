import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabaseClient";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <DropdownMenuItem onClick={logout}>
        <IconLogout />
        Log out
      </DropdownMenuItem>
    </>
  );
}
