import { createClient } from "@/lib/supabase/supabaseServer";
import Documents from "./documents";
import { Suspense } from "react";

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
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Documents notebook={data} />
      </Suspense>
    );
  }
}
