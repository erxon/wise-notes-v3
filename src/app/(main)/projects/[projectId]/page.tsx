import { getProject } from "@/app/server-actions/projects";
import ProjectDetailView from "./project-detail-view";
import ProjectDocuments from "../components/project-documents";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;

  try {
    const { data: project } = await getProject(projectId);

    if (!project) {
      notFound();
    }

    return (
      <ProjectDetailView
        project={project}
        documentsContent={<ProjectDocuments projectId={project.id} />}
      />
    );
  } catch (error) {
    notFound();
  }
}
