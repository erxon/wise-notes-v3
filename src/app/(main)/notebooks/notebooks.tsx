import { getNotebooks } from "@/app/server-actions/notebooks";
import { EmptyNotebooks } from "./empty";
import NotebooksView from "./notebooks-view";
import { cookies } from "next/headers";

export default async function Notebooks() {
  const { data: notebooks, error } = await getNotebooks();
  const cookieStore = await cookies();
  const initialView =
    (cookieStore.get("notebook-view")?.value as "grid" | "list") || "grid";

  if (notebooks && notebooks.length === 0) {
    return <EmptyNotebooks />;
  }

  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching notebooks";
    return (
      <div className="">
        <h1>Something went wrong</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return <NotebooksView notebooks={notebooks} initialView={initialView} />;
}
