"use client";

import { useState } from "react";
import DocumentCard from "../components/document_card";
import { Notebook } from "@/app/server-actions/notebooks";
import Document from "@/lib/types/document";
import { Button } from "@/components/ui/button";
import {
  IconLayoutGridFilled,
  IconLayoutListFilled,
  IconPlus,
} from "@tabler/icons-react";
import TooltipWrapper from "@/components/utils/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DocumentsViewProps {
  notebook: Notebook;
  documents: Document[];
  initialView?: "grid" | "list";
}

export default function DocumentsView({
  notebook,
  documents,
  initialView = "grid",
}: DocumentsViewProps) {
  const [view, setView] = useState<"grid" | "list">(initialView);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    document.cookie = `document-view=${newView}; path=/; max-age=31536000`; // Persist for 1 year
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 md:flex-row">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2>{notebook.name}</h2>
          <p className="text-muted-foreground">{notebook.description}</p>
        </div>
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
          <Link href={`/editor/${notebook.id}`}>
            <Button size={"lg"}>
              <IconPlus />
              New document
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "gap-4",
          view === "grid" ? "grid grid-cols-1 lg:grid-cols-3" : "flex flex-col"
        )}
      >
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} view={view} />
        ))}
      </div>
    </>
  );
}
