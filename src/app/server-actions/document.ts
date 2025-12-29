"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export interface Document {
  id?: string;
  notebook_id: number;
  title: string;
  content: string;
}

export async function getDocument(documentId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateDocument(document: Document) {
  const supabase = await createClient();

  if (!document.id) {
    // Create a new document
    const { data, error } = await supabase
      .from("documents")
      .insert({
        notebook_id: Number(document.notebook_id),
        title: document.title,
        content: document.content,
      })
      .select("*")
      .single();
    if (error) throw error;
    return data;
  }
  // Update existing document
  const { data, error } = await supabase
    .from("documents")
    .update({
      notebook_id: Number(document.notebook_id),
      title: document.title,
      content: document.content,
    })
    .eq("id", document.id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDocument(documentId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", documentId);

  return { error };
}

export async function moveDocument(documentId: string, notebook_id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("documents")
    .update({ notebook_id })
    .eq("id", documentId);

  if (error) throw error;
}
