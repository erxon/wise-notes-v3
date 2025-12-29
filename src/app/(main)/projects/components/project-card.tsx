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
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import elapsedTime from "@/lib/utils/elapsed-time";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between items-center text-sm text-muted-foreground">
        <span>Modified {elapsedTime(project.created_at)}</span>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/projects/${project.id}`}>
            Open <IconArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
