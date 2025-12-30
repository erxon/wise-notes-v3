"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { createProject } from "@/app/server-actions/projects";
import { ImageUpload } from "@/components/image-upload";
import { deleteObjectFromS3 } from "@/app/server-actions/s3";

export default function CreateProject() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coverImageKey, setCoverImageKey] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (coverImageKey) {
      formData.append("cover_image_key", coverImageKey);
    }

    try {
      await createProject(formData);
      setOpen(false);
      toast.success("Project created successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize your documents and use studio
            tools.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. History Final"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Project description (optional)"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload
              value={coverImageKey}
              onChange={setCoverImageKey}
              onRemove={async () => {
                if (coverImageKey) {
                  await deleteObjectFromS3(coverImageKey);
                }
                setCoverImageKey("");
              }}
              className="w-full"
              folder="projects"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
