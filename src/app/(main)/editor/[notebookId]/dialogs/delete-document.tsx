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
import React from "react";
import { toast } from "sonner";
import { deleteDocument } from "@/app/server-actions/document";
import { useRouter } from "next/navigation";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export default function DeleteDocumentDialog({
  open,
  onOpenChange,
  documentId,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  documentId?: string;
}) {
  const router = useRouter();
  const onDelete = async () => {
    if (!documentId) return;

    const { error } = await deleteDocument(documentId);
    if (error) {
      toast.error("Failed to delete document", {
        description: getFriendlyErrorMessage(error),
      });
      return;
    }

    onOpenChange(false);
    toast.success("Document deleted successfully");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => onDelete()}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
