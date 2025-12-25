"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { getNotebooks } from "@/app/server-actions/notebooks";
import { toast } from "sonner";
import Notebook from "@/lib/types/notebook";
import { moveDocument } from "@/app/server-actions/document";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MoveDocumentDialog({
  open,
  onOpenChange,
  documentId,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  documentId?: string;
}) {
  const router = useRouter();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [selectedNotebookId, setSelectedNotebookId] = useState<number | null>(
    null
  );

  const fetchNotebooks = useCallback(async () => {
    try {
      const fetchedNotebooks = await getNotebooks();
      setNotebooks(fetchedNotebooks.data);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Unexpected error occurred. Please try again later.",
      });
    }
  }, []);

  useEffect(() => {
    fetchNotebooks();
  }, [fetchNotebooks]);

  const handleMoveDocument = async () => {
    if (!documentId || !selectedNotebookId) return;

    try {
      await moveDocument(documentId, selectedNotebookId);
      onOpenChange(false);
      toast.success("Document moved successfully");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Document</DialogTitle>
          <DialogDescription>
            Select a notebook to move this document to.
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(value) => {
            setSelectedNotebookId(Number(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a notebook" />
          </SelectTrigger>
          <SelectContent>
            {notebooks.map((notebook) => (
              <SelectItem key={notebook.id} value={notebook.id.toString()}>
                {notebook.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleMoveDocument}>Move</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
