"use client";

import { IconNotebook } from "@tabler/icons-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateNotebook } from "./dialogs/create-notebook";

export function EmptyNotebooks() {
  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconNotebook />
          </EmptyMedia>
          <EmptyTitle>No Notebooks Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any notebooks yet. Get started by creating
            your first notebook.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <CreateNotebook />
          </div>
        </EmptyContent>
      </Empty>
    </>
  );
}
