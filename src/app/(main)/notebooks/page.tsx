import { Suspense } from "react";
import Notebooks from "./notebooks";
import NotebooksHeader from "./components/notebooks-header";
import { cookies } from "next/headers";
import NotebooksSkeleton from "./components/notebooks-skeleton";

export default async function Page() {
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("notebook-view")?.value as "grid" | "list") || "grid";

  return (
    <div className="flex flex-col">
      <Suspense fallback={<NotebooksSkeleton view={initialView} />}>
        <Notebooks />
      </Suspense>
    </div>
  );
}
