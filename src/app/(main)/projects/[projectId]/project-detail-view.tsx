"use client";

import Project from "@/lib/types/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectChatbot from "../components/project-chatbot";
import ProjectStudio from "../components/project-studio";
import { ReactNode } from "react";

interface ProjectDetailViewProps {
  project: Project;
  documentsContent: ReactNode;
}

export default function ProjectDetailView({
  project,
  documentsContent,
}: ProjectDetailViewProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground">
          {project.description || "No description provided."}
        </p>
      </div>

      <Tabs defaultValue="documents" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          <TabsTrigger value="studio">Studio</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="flex-1 mt-4">
          {documentsContent}
        </TabsContent>
        <TabsContent value="chatbot" className="flex-1 mt-4">
          <ProjectChatbot projectId={project.id} />
        </TabsContent>
        <TabsContent value="studio" className="flex-1 mt-4">
          <ProjectStudio projectId={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
