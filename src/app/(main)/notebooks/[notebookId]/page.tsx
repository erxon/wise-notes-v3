import { Suspense } from "react";
import Notebook from "./notebook";

export default async function Page({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Notebook notebookId={notebookId} />
      </Suspense>
    </>
  );
}
