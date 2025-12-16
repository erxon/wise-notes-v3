"use client";

import { IconFile } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function EmptyNotebook() {
  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFile />
          </EmptyMedia>
          <EmptyTitle>No Documents Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any documents yet. Get started by writing
            your first document.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Link href={"/editor"}>
              <Button>Create new document</Button>
            </Link>
          </div>
        </EmptyContent>
      </Empty>
    </>
  );
}
