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
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateProject } from "@/app/server-actions/projects";
import { ImageUpload } from "@/components/image-upload";
import { deleteObjectFromS3 } from "@/app/server-actions/s3";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Project from "@/lib/types/project";

interface EditProjectProps {
  project: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function EditProject({
  project,
  open,
  onOpenChange,
}: EditProjectProps) {
  const [loading, setLoading] = useState(false);
  const [coverImageKey, setCoverImageKey] = useState(
    project.cover_image_key || ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (coverImageKey) {
      formData.append("cover_image_key", coverImageKey);
    }

    try {
      await updateProject(project.id, formData);
      onOpenChange?.(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project details and cover image.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={project.name}
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
              defaultValue={project.description}
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
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
