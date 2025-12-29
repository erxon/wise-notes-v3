import { Suspense } from "react";
import EditorContent from "../components/editor-content";
import EditorSkeleton from "../components/editor-skeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;

  return (
    <Suspense fallback={<EditorSkeleton />}>
      <EditorContent notebookId={notebookId} />
    </Suspense>
  );
}
