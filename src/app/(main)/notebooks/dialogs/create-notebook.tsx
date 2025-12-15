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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createNotebook } from "@/app/server-actions/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { IconPlus } from "@tabler/icons-react";

export function CreateNotebook() {
  const [openChange, onOpenChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notebook, setNotebook] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    if (notebook.name === "") {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const createdNotebook = await createNotebook(notebook);

      console.log(createdNotebook);

      toast.success("Your notebook has been created successfully", {
        description: `${notebook.name} has been created`,
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
    <Dialog open={openChange} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus />
          Create Notebook
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create notebook</DialogTitle>
          <DialogDescription>
            Create a new notebook to store your collections
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
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
          <Button disabled={isLoading} onClick={handleCreate}>
            Create
            {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
