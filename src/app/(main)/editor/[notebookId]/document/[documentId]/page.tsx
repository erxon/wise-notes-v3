import Document from "./document";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string; documentId: string }>;
}) {
  // notebookId is not used in this component
  const { documentId } = await params;

  return (
    <Suspense fallback={<Spinner />}>
      <Document documentId={documentId} />
    </Suspense>
  );
}
