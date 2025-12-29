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
import NotebooksHeader from "./components/notebooks-header";

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
      <NotebooksHeader view={view} onViewChange={handleViewChange} />
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
