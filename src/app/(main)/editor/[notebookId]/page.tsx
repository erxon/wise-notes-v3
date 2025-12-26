import DocumentEditor from "@/components/document-editor/document-editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createClient } from "@/lib/supabase/supabaseServer";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notebook")
    .select("*")
    .eq("id", notebookId)
    .single();

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/notebooks">Notebooks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/notebooks/${data.id}`}>
              {data.name || "Notebook"}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DocumentEditor notebookId={notebookId} />
    </div>
  );
}
