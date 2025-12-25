import Document from "./document";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string; documentId: string }>;
}) {
  const { notebookId, documentId } = await params;

  return (
    <Suspense fallback={<Spinner />}>
      <Document documentId={documentId} />
    </Suspense>
  );
}
