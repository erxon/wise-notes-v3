import { createClient } from "@/lib/supabase/supabaseServer";
import { Notebook } from "@/app/server-actions/notebooks";
import { EmptyNotebook } from "./empty";
import DocumentsView from "./documents-view";
import { cookies } from "next/headers";

export default async function Documents({ notebook }: { notebook: Notebook }) {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("document-view")?.value as "grid" | "list") || "grid";

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("notebook_id", Number(notebook.id))
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return (
      <div>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (data && data.length === 0) {
    return <EmptyNotebook notebookId={notebook.id} />;
  }

  return (
    <DocumentsView
      notebook={notebook}
      documents={data}
      initialView={initialView}
    />
  );
}
