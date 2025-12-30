"use client";

import { useState } from "react";
import ProjectCard from "./project-card";
import Project from "@/lib/types/project";
import { cn } from "@/lib/utils";
import ProjectsHeader from "./projects-header";

interface ProjectsViewProps {
  projects: Project[];
  initialView?: "grid" | "list";
}

export default function ProjectsView({
  projects,
  initialView = "grid",
}: ProjectsViewProps) {
  const [view, setView] = useState<"grid" | "list">(initialView);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    document.cookie = `project-view=${newView}; path=/; max-age=31536000`; // Persist for 1 year
  };

  return (
    <>
      <ProjectsHeader view={view} onViewChange={handleViewChange} />
      <div
        className={cn(
          "gap-4",
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        )}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} view={view} />
        ))}
      </div>
    </>
  );
}
