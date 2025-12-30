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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createNotebook } from "@/app/server-actions/notebooks";
import { deleteObjectFromS3 } from "@/app/server-actions/s3";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { IconPlus } from "@tabler/icons-react";
import { ImageUpload } from "@/components/image-upload";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function CreateNotebook() {
  const [openChange, onOpenChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notebook, setNotebook] = useState({
    name: "",
    description: "",
    cover_image_key: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleCreate = async () => {
    if (notebook.name === "") {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const createdNotebook = await createNotebook(notebook);

      toast.success("Your notebook has been created successfully", {
        description: `${createdNotebook.name} has been created`,
      });
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
    router.refresh();
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
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              onChange={handleNameChange}
              value={notebook.name}
              placeholder="Type the notebook name..."
            />
            <FieldDescription>{notebook.name.length}/50</FieldDescription>
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">
              Description {"(optional)"}
            </FieldLabel>
            <Textarea
              id="description"
              onChange={handleDescriptionChange}
              value={notebook.description}
              placeholder="Type the description here..."
              className="resize-none"
            />
            <FieldDescription>
              {notebook.description.length}/100
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Cover Image</FieldLabel>
            <ImageUpload
              value={notebook.cover_image_key}
              onChange={(key) =>
                setNotebook({ ...notebook, cover_image_key: key })
              }
              onRemove={async () => {
                if (notebook.cover_image_key) {
                  await deleteObjectFromS3(notebook.cover_image_key);
                }
                setNotebook({ ...notebook, cover_image_key: "" });
              }}
              className="w-full"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose onClick={() => setError("")} asChild>
            <Button disabled={isLoading} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={handleCreate}>
            {isLoading ? "Creating..." : "Create"}
            {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
