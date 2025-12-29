"use client";

import Project from "@/lib/types/project";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconArrowRight,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import elapsedTime from "@/lib/utils/elapsed-time";
import { useState } from "react";
import DeleteProjectDialog from "../dialogs/delete-project";
import EditProjectDialog from "../dialogs/edit-project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectCard({ project }: { project: Project }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-md transition-shadow group">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="truncate pr-4">{project.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <IconDots className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <IconPencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                  <IconTrash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description || "No description"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto flex justify-between items-center text-sm text-muted-foreground">
          <span>Modified {elapsedTime(project.updated_at)}</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/projects/${project.id}`}>
              Open <IconArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <EditProjectDialog
        project={project}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <DeleteProjectDialog
        project={project}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
}
