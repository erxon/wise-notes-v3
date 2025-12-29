import { Suspense } from "react";
import Notebook from "./notebook";
import { cookies } from "next/headers";
import NotebookDetailSkeleton from "./components/notebook-detail-skeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("document-view")?.value as "grid" | "list") || "grid";

  return (
    <>
      <Suspense fallback={<NotebookDetailSkeleton view={initialView} />}>
        <Notebook notebookId={notebookId} />
      </Suspense>
    </>
  );
}
