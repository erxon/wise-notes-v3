"use client";

import Project from "@/lib/types/project";
import elapsedTime from "@/lib/utils/elapsed-time";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconArrowRight,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { getProjectImage, deleteProject } from "@/app/server-actions/projects";
import { toast } from "sonner";
import EditProject from "../dialogs/edit-project";

function ProjectMDropdownMenu({ project }: { project: Project }) {
  const [openEditor, setOpenEditor] = useState(false);

  const handleDelete = async () => {
    try {
      const { error } = await deleteProject(project.id);
      if (error) {
        toast.error("Failed to delete project");
      } else {
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the project");
    }
  };

  return (
    <>
      <EditProject
        project={project}
        open={openEditor}
        onOpenChange={setOpenEditor}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon-sm"} variant={"ghost"}>
            <IconDots className="h-8 w-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenEditor(true);
            }}
          >
            <IconPencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive focus:text-destructive"
          >
            <IconTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function CardView({ project }: { project: Project }) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      const image = await getProjectImage(project.id);
      if (isMounted) setImage(image.data);
    };
    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [project.id]);

  return (
    <Card className="pt-0 min-h-[375px] transition hover:shadow-md">
      <AspectRatio ratio={16 / 7} className="bg-muted rounded-t-lg">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          }
          alt={project.name}
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] rounded-t-lg"
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description || "No description provided."}
        </CardDescription>
        <CardAction className="flex gap-1">
          <ProjectMDropdownMenu project={project} />
        </CardAction>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center gap-4 justify-between text-muted-foreground text-sm">
        <p>Created {elapsedTime(project.created_at)}</p>

        <Button role="link" size={"sm"} variant="ghost" asChild>
          <Link href={`/projects/${project.id}`}>
            Open <IconArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ListView({ project }: { project: Project }) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-muted/50">
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <Link
          href={`/projects/${project.id}`}
          className="font-semibold hover:underline truncate text-base"
        >
          {project.name}
        </Link>
        <p className="text-muted-foreground text-sm truncate">
          {project.description || "No description"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="text-muted-foreground text-sm whitespace-nowrap hidden md:block">
          {elapsedTime(project.created_at)}
        </p>
        <div className="flex items-center gap-2">
          <ProjectMDropdownMenu project={project} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  view = "grid",
}: {
  project: Project;
  view?: "grid" | "list";
}) {
  return view === "grid" ? (
    <CardView project={project} />
  ) : (
    <ListView project={project} />
  );
}
