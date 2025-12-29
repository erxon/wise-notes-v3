import Document from "./document";
import { Suspense } from "react";
import EditorSkeleton from "../../../components/editor-skeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string; documentId: string }>;
}) {
  // notebookId is not used in this component
  const { documentId } = await params;

  return (
    <Suspense fallback={<EditorSkeleton />}>
      <Document documentId={documentId} />
    </Suspense>
  );
}
