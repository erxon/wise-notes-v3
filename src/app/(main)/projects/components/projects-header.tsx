"use client";

import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";
import { cn } from "@/lib/utils";
import CreateProject from "../dialogs/create-project";

interface ProjectsHeaderProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function ProjectsHeader({
  view,
  onViewChange,
}: ProjectsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage your projects and connected documents.
        </p>
      </div>
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
        <CreateProject />
      </div>
    </div>
  );
}
