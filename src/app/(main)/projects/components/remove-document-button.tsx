"use client";

import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { removeDocumentFromProject } from "@/app/server-actions/projects";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RemoveDocumentButtonProps {
  projectId: number;
  documentId: number;
  documentTitle: string;
}

export default function RemoveDocumentButton({
  projectId,
  documentId,
  documentTitle,
}: RemoveDocumentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeDocumentFromProject(projectId, documentId);
      toast.success("Document removed from project");
      setOpen(false);
    } catch (_error) {
      toast.error("Failed to remove document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
        >
          <IconTrash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Document?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove &quot;{documentTitle}&quot; from
            this project? This will not delete the document itself.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
