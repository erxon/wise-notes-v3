import { createClient } from "@/lib/supabase/supabaseServer";
import Documents from "./documents";
import { Suspense } from "react";
import { cookies } from "next/headers";
import NotebookDetailSkeleton from "./components/notebook-detail-skeleton";

export default async function Notebook({ notebookId }: { notebookId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebooks")
    .select("*")
    .eq("id", Number(notebookId))
    .maybeSingle();

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (data) {
    const cookieStore = await cookies();
    const initialView =
      (cookieStore.get("document-view")?.value as "grid" | "list") || "grid";

    return (
      <Suspense fallback={<NotebookDetailSkeleton view={initialView} />}>
        <Documents notebook={data} />
      </Suspense>
    );
  }
}
