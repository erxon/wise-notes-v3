import { getDocument } from "@/app/server-actions/document";
import DocumentEditor from "@/components/document-editor/document-editor";
import { createClient } from "@/lib/supabase/supabaseServer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Document({ documentId }: { documentId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("document")
    .select("*, notebook(name)")
    .eq("id", documentId)
    .single();

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/notebooks">Notebooks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/notebooks/${data.notebookId}`}>
              {data.notebook?.name || "Notebook"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title || "Untitled"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DocumentEditor
        notebookId={String(data.notebookId)}
        existingDocument={data}
      />
    </div>
  );
}
