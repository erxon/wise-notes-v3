"use server";

import { createClient } from "@/lib/supabase/supabaseServer";
import { revalidatePath } from "next/cache";
import Project from "@/lib/types/project";

export async function getProjects() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return { data: data as Project[] };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) {
    throw new Error("Project name is required");
  }

  const { error } = await supabase.from("projects").insert({
    name,
    description,
    user_id: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/projects");
}

export async function getProject(projectId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { data: data as Project };
}

export async function addDocumentToProject(projectId: number, documentId: number) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("project_documents")
    .insert({
      project_id: projectId,
      document_id: documentId,
    });

  if (error) {
    console.error(error);
    throw new Error("Failed to add document to project");
  }

  revalidatePath(`/projects/${projectId}`);
}

export async function removeDocumentFromProject(projectId: number, documentId: number) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("project_documents")
    .delete()
    .match({ project_id: projectId, document_id: documentId });

  if (error) {
    throw new Error("Failed to remove document from project");
  }

  revalidatePath(`/projects/${projectId}`);
}

export async function getProjectDocuments(projectId: number) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("project_documents")
    .select(`
      id,
      added_at,
      document:document_id (
        id,
        title,
        updated_at,
        notebooks:notebook_id (
           name,
           id
        )
      )
    `)
    .eq("project_id", projectId)
    .order("added_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function addDocumentsToProject(projectId: number, documentIds: number[]) {
  const supabase = await createClient();

  const records = documentIds.map(documentId => ({
    project_id: projectId,
    document_id: documentId,
  }));

  const { error } = await supabase
    .from("project_documents")
    .insert(records);

  if (error) {
    console.error(error);
    throw new Error("Failed to add documents to project");
  }

  revalidatePath(`/projects/${projectId}`);
}

export async function addNotebookToProject(projectId: number, notebookId: number) {
  const supabase = await createClient();

  const { data: documents, error: fetchError } = await supabase
    .from("documents")
    .select("id")
    .eq("notebook_id", notebookId);

  if (fetchError || !documents) {
    throw new Error("Failed to fetch notebook documents");
  }

  if (documents.length === 0) {
    return;
  }

  const { data: existingMap } = await supabase
    .from("project_documents")
    .select("document_id")
    .eq("project_id", projectId);
    
  const existingDocIds = new Set(existingMap?.map(r => r.document_id));
  
  const newRecords = documents
    .filter(doc => !existingDocIds.has(doc.id))
    .map(doc => ({
      project_id: projectId,
      document_id: doc.id,
    }));

  if (newRecords.length === 0) {
    return;
  }

  const { error } = await supabase
    .from("project_documents")
    .insert(newRecords);

  if (error) {
    console.error(error);
    throw new Error("Failed to add notebook documents to project");
  }

  revalidatePath(`/projects/${projectId}`);
}
