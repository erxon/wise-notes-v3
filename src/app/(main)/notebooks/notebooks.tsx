import { getNotebooks } from "@/app/server-actions/notebooks";
import { EmptyNotebooks } from "./empty";
import { CreateNotebook } from "./dialogs/create-notebook";
import Notebook from "./components/notebook";
import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";

export default async function Notebooks() {
  const { data: notebooks, error } = await getNotebooks();

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

  return (
    <>
      <div className="mb-8 flex">
        <h1>My Notebooks</h1>
        <div className="ml-auto flex gap-2">
          <TooltipWrapper content="Grid view">
            <Button size={"icon"} variant={"secondary"}>
              <IconLayoutGridFilled className="text-neutral-700" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="List view">
            <Button size={"icon"} variant={"secondary"}>
              <IconLayoutListFilled className="text-neutral-700" />
            </Button>
          </TooltipWrapper>
          <CreateNotebook />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {notebooks.map((notebook) => (
          <Notebook key={notebook.id} notebook={notebook} />
        ))}
      </div>
    </>
  );
}
