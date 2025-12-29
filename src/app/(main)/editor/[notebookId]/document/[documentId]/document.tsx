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
    .from("documents")
    .select("*, notebooks(name)")
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
            <BreadcrumbLink href={`/notebooks/${data.notebook_id}`}>
              {data.notebooks?.name || "Notebook"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title || "Untitled"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DocumentEditor
        notebookId={String(data.notebook_id)}
        existingDocument={data}
      />
    </div>
  );
}
