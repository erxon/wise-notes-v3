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

  let project;
  try {
    const { data } = await getProject(projectId);
    project = data;
  } catch (_error) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailView
      project={project}
      documentsContent={<ProjectDocuments projectId={project.id} />}
    />
  );
}
