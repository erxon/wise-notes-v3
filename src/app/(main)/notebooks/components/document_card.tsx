"use client";

import Document from "@/lib/types/document";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconCornerUpRight,
  IconDots,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteDocumentDialog from "../../editor/[notebookId]/dialogs/delete-document";
import { useState } from "react";
import MoveDocumentDialog from "../../editor/[notebookId]/dialogs/move-document";

function DocumentActions({ document }: { document: Document }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenMoveDialog(true)}>
            <IconCornerUpRight /> Move
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenDeleteDialog(true);
            }}
          >
            <IconTrash /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/editor/${document.notebookId}/document/${document.id}`}
            >
              <IconEdit /> Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDocumentDialog
        documentId={document.id}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
      <MoveDocumentDialog
        documentId={document.id}
        open={openMoveDialog}
        onOpenChange={setOpenMoveDialog}
      />
    </>
  );
}

function CardView({ document }: { document: Document }) {
  const createdAt = new Date(document.createdAt);
  const text = document.content
    ? document.content.replace(/<[^>]*>?/gm, "")
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{document.title}</CardTitle>
        <CardDescription>{createdAt.toDateString()}</CardDescription>
        <CardAction>
          <DocumentActions document={document} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {text.slice(0, 100) || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}

function ListView({ document }: { document: Document }) {
  const createdAt = new Date(document.createdAt);
  const text = document.content
    ? document.content.replace(/<[^>]*>?/gm, "")
    : "";

  return (
    <div className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-muted/50">
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/editor/${document.notebookId}/document/${document.id}`}
            className="font-semibold hover:underline truncate text-base"
          >
            {document.title}
          </Link>
        </div>
        <p className="text-muted-foreground text-sm truncate">
          {text.slice(0, 100) || "No content"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="text-muted-foreground text-sm whitespace-nowrap hidden md:block">
          {createdAt.toDateString()}
        </p>
        <div className="flex items-center gap-2">
          <Link href={`/editor/${document.notebookId}/document/${document.id}`}>
            <Button size={"sm"} variant={"outline"}>
              Open
            </Button>
          </Link>
          <DocumentActions document={document} />
        </div>
      </div>
    </div>
  );
}

export default function DocumentCard({
  document,
  view = "grid",
}: {
  document: Document;
  view?: "grid" | "list";
}) {
  return view === "grid" ? (
    <CardView document={document} />
  ) : (
    <ListView document={document} />
  );
}
