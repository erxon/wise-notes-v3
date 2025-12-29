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
import { deleteProject } from "@/app/server-actions/projects";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import Project from "@/lib/types/project";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export default function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const { error } = await deleteProject(project.id);

    if (error) {
      setIsLoading(false);
      toast.error("Failed to delete project", {
        description: getFriendlyErrorMessage(error),
      });
      return;
    }

    toast.success("Project deleted successfully", {
      description: `${project.name} has been deleted`,
    });

    setIsLoading(false);
    onOpenChange(false);

    router.push("/projects");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {project.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {project.name}? This action cannot
            be undone and will disconnect all documents from this project.
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
            {isLoading ? (
              <>
                Deleting...
                <Spinner className="ml-2" />
              </>
            ) : (
              "Delete Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
