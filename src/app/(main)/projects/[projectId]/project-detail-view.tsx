"use client";

import Project from "@/lib/types/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectChatbot from "../components/project-chatbot";
import ProjectStudio from "../components/project-studio";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
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

interface ProjectDetailViewProps {
  project: Project;
  documentsContent: ReactNode;
}

export default function ProjectDetailView({
  project,
  documentsContent,
}: ProjectDetailViewProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <IconDots className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
              <IconPencil className="mr-2 h-4 w-4" />
              Edit details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <IconTrash className="mr-2 h-4 w-4" />
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    </div>
  );
}
