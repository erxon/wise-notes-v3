import DocumentEditor from "@/components/document-editor/document-editor";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;

  return (
    <div>
      <DocumentEditor notebookId={notebookId} />
    </div>
  );
}
