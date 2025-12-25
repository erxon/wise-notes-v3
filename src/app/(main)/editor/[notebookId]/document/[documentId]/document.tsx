import { getDocument } from "@/app/server-actions/document";
import DocumentEditor from "@/components/document-editor/document-editor";
import { createClient } from "@/lib/supabase/supabaseServer";

export default async function Document({ documentId }: { documentId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("document")
    .select("*")
    .eq("id", documentId)
    .single();

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <DocumentEditor
      notebookId={String(data.notebookId)}
      existingDocument={data}
    />
  );
}
