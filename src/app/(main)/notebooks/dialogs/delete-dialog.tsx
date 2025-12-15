"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteNotebook } from "@/app/server-actions/notebooks";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import Notebook from "@/lib/types/notebook";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function DeleteDialog({
  notebook,
  open,
  onOpenChange,
}: {
  notebook: Notebook;
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await deleteNotebook(notebook.id);

      toast.success("Notebook deleted successfully", {
        description: `${notebook.name} has been deleted`,
      });

      setIsLoading(false);
      onOpenChange(false);

      router.push("/notebooks");
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
          <DialogTitle>Delete {notebook.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {notebook.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={onDelete}
            disabled={isLoading}
          >
            Delete
            {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
