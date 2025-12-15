"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SetStateAction, useState } from "react";
import { updateNotebook } from "@/app/server-actions/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import type Notebook from "@/lib/types/notebook";

export function Editor({
  currentNotebook,
  open,
  onOpenChange,
}: {
  currentNotebook: Notebook;
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notebook, setNotebook] = useState({
    name: currentNotebook.name,
    description: currentNotebook.description,
  });

  const handleUpdate = async () => {
    if (notebook.name === "") {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await updateNotebook(currentNotebook.id, notebook);

      toast.success("Your notebook has been updated successfully", {
        description: `${notebook.name} has been updated`,
      });

      setIsLoading(false);
      onOpenChange(false);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Unexpected error occurred. Please try again later.",
      });

      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update {currentNotebook.name}</DialogTitle>
          <DialogDescription>Update your notebook here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={notebook.name}
              onChange={(event) =>
                setNotebook({ ...notebook, name: event.target.value })
              }
              placeholder="Type the notebook name..."
            />
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description {"(optional)"}</Label>
            <Textarea
              value={notebook.description}
              onChange={(event) => {
                setNotebook({ ...notebook, description: event.target.value });
              }}
              placeholder="Type the description here..."
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose onClick={() => setError("")} asChild>
            <Button disabled={isLoading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={handleUpdate}>
            Update
            {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
