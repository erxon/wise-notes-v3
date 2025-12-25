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
  IconCornerRightUp,
  IconCornerUpRight,
  IconDots,
  IconEdit,
  IconShare,
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

export default function DocumentCard({ document }: { document: Document }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const createdAt = new Date(document.createdAt);
  const text = document.content
    ? document.content.replace(/<[^>]*>?/gm, "")
    : "";

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="truncate">{document.title}</CardTitle>
          <CardDescription>{createdAt.toDateString()}</CardDescription>
          <CardAction>
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
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {text.slice(0, 100) || "No content"}
          </p>
        </CardContent>
      </Card>
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
