"use client";

import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";
import { cn } from "@/lib/utils";
import { CreateNotebook } from "../dialogs/create-notebook";

interface NotebooksHeaderProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function NotebooksHeader({
  view,
  onViewChange,
}: NotebooksHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
      <h1>My Notebooks</h1>
      <div className="md:ml-auto flex gap-2">
        <TooltipWrapper content="Grid view">
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={() => onViewChange("grid")}
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
            onClick={() => onViewChange("list")}
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
  );
}
