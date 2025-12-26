"use client";

import { useState } from "react";
import Notebook from "./components/notebook";
import type NotebookType from "@/lib/types/notebook";
import { CreateNotebook } from "./dialogs/create-notebook";
import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";
import { cn } from "@/lib/utils";

interface NotebooksViewProps {
  notebooks: NotebookType[];
  initialView?: "grid" | "list";
}

export default function NotebooksView({
  notebooks,
  initialView = "grid",
}: NotebooksViewProps) {
  const [view, setView] = useState<"grid" | "list">(initialView);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    document.cookie = `notebook-view=${newView}; path=/; max-age=31536000`; // Persist for 1 year
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
        <h1>My Notebooks</h1>
        <div className="md:ml-auto flex gap-2">
          <TooltipWrapper content="Grid view">
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => handleViewChange("grid")}
              className={cn(
                view === "grid" && "bg-neutral-200 dark:bg-neutral-800"
              )}
            >
              <IconLayoutGridFilled className="text-neutral-700 dark:text-neutral-300" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="List view">
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => handleViewChange("list")}
              className={cn(
                view === "list" && "bg-neutral-200 dark:bg-neutral-800"
              )}
            >
              <IconLayoutListFilled className="text-neutral-700 dark:text-neutral-300" />
            </Button>
          </TooltipWrapper>
          <CreateNotebook />
        </div>
      </div>
      <div
        className={cn(
          "gap-4",
          view === "grid" ? "grid grid-cols-1 lg:grid-cols-3" : "flex flex-col"
        )}
      >
        {notebooks.map((notebook) => (
          <Notebook key={notebook.id} notebook={notebook} view={view} />
        ))}
      </div>
    </>
  );
}
