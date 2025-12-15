"use client";

import type Notebook from "@/lib/types/notebook";
import elapsedTime from "@/lib/utils/elapsed-time";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "../dialogs/delete-dialog";
import { useState } from "react";
import { Editor } from "../dialogs/editor";

function NotebookMDropdownMenu({ notebook }: { notebook: Notebook }) {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <>
      <DeleteDialog
        notebook={notebook}
        open={openDeleteConfirmation}
        onOpenChange={setOpenDeleteConfirmation}
      />
      <Editor
        currentNotebook={notebook}
        open={openEditor}
        onOpenChange={setOpenEditor}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon-sm"} variant={"ghost"}>
            <IconDots className="h-8 w-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenEditor(true);
            }}
          >
            <IconPencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenDeleteConfirmation(true);
            }}
          >
            <IconTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default function Notebook({ notebook }: { notebook: Notebook }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
        <CardDescription>{notebook.description}</CardDescription>
        <CardAction className="flex gap-1">
          <Button size={"sm"} variant={"outline"}>
            Open
          </Button>
          <NotebookMDropdownMenu notebook={notebook} />
        </CardAction>
      </CardHeader>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Modified {elapsedTime(notebook.updatedAt)}
        </p>
      </CardFooter>
    </Card>
  );
}
