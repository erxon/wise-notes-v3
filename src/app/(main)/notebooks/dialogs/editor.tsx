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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 50) {
      setNotebook({ ...notebook, name: event.target.value });
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= 100) {
      setNotebook({ ...notebook, description: event.target.value });
    }
  };

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

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Unexpected error occurred. Please try again later.",
      });
    }

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update {currentNotebook.name}</DialogTitle>
          <DialogDescription>Update your notebook here</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={notebook.name}
              onChange={handleNameChange}
              placeholder="Type the notebook name..."
            />
            <FieldDescription>{notebook.name.length}/50</FieldDescription>
            {error && <FieldError>{error}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="username-1">
              Description {"(optional)"}
            </FieldLabel>
            <Textarea
              value={notebook.description}
              onChange={handleDescriptionChange}
              placeholder="Type the description here..."
              className="resize-none"
            />
            <FieldDescription>
              {notebook.description ? notebook.description.length : 0}
              /100
            </FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose onClick={() => setError("")} asChild>
            <Button disabled={isLoading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={handleUpdate}>
            {isLoading ? "Updating" : "Update"}
            {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
