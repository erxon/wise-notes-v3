import { createClient } from "@/lib/supabase/supabaseServer";
import { Notebook } from "@/app/server-actions/notebooks";
import { EmptyNotebook } from "./empty";
import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
  IconPlus,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";
import Link from "next/link";
/*

TODO - Add state management

*/

export default async function Documents({ notebook }: { notebook: Notebook }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("document")
    .select("*")
    .eq("notebook_id", notebook.id)
    .order("createdAt", { ascending: false });

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (data && data.length === 0) {
    return <EmptyNotebook notebookId={notebook.id} />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <h2>{notebook.name}</h2>
          <p className="text-muted-foreground">{notebook.description}</p>
        </div>
        <div className="md:ml-auto flex gap-2">
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
          <Link href={`/editor/${notebook.id}`}>
            <Button size={"lg"}>
              <IconPlus />
              New document
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
